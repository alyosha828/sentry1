/*
 * @license
 * chartjs-plugin-crosshair
 * http://abelheinsbroek.nl/
 * Version: 1.1.3
 *
 * Copyright 2019 Abel Heinsbroek
 * Released under the MIT license
 * https://github.com/abelheinsbroek/chartjs-plugin-crosshair/blob/master/LICENSE.md
 */

/*
 * TODO I have altered this plugin, because original variant didn't work with our project.
 * I suspect that the reason is dependency module which used in the original project, 'AMD' dependency
 * But it need to be tested later what the reason and possibly submti bugfix to the origin project
 * */

import Chart from "chart.js";
const helpers = Chart.helpers;
const defaultOptions = {
  line: {
    color: "#F66",
    width: 1
  },
  sync: {
    enabled: true,
    group: 1,
    suppressTooltips: false
  },
  zoom: {
    enabled: true,
    zoomboxBackgroundColor: "rgba(66,133,244,0.2)",
    zoomboxBorderColor: "#48F",
    zoomButtonText: "Reset Zoom",
    zoomButtonClass: "reset-zoom"
  },
  callbacks: {
    beforeZoom: function() {
      return true;
    },
    afterZoom: function() {}
  }
};
const crosshairPlugin = {
  id: "crosshair",

  afterInit: function(chart) {
    if (chart.config.options.scales.xAxes.length === 0) {
      return;
    }
    const xScaleType = chart.config.options.scales.xAxes[0].type;

    if (xScaleType !== "linear" && xScaleType !== "time") {
      return;
    }

    if (chart.options.plugins.crosshair === undefined) {
      chart.options.plugins.crosshair = defaultOptions;
    }

    chart.crosshair = {
      enabled: false,
      x: null,
      originalData: [],
      originalXRange: {},
      dragStarted: false,
      dragStartX: null,
      dragEndX: null,
      suppressTooltips: false,
      reset: function() {
        this.resetZoom(chart, false, false);
      }.bind(this)
    };

    const syncEnabled = this.getOption(chart, "sync", "enabled");
    if (syncEnabled) {
      chart.crosshair.syncEventHandler = function(e) {
        this.handleSyncEvent(chart, e);
      }.bind(this);

      chart.crosshair.resetZoomEventHandler = function(e) {
        const syncGroup = this.getOption(chart, "sync", "group");
        if (e.chartId !== chart.id && e.syncGroup === syncGroup) {
          this.resetZoom(chart, true);
        }
      }.bind(this);

      window.addEventListener("sync-event", chart.crosshair.syncEventHandler);
      window.addEventListener(
        "reset-zoom-event",
        chart.crosshair.resetZoomEventHandler
      );
    }

    chart.panZoom = this.panZoom.bind(this, chart);
  },

  destroy: function(chart) {
    const syncEnabled = this.getOption(chart, "sync", "enabled");
    if (syncEnabled) {
      window.removeEventListener(
        "sync-event",
        chart.crosshair.syncEventHandler
      );
      window.removeEventListener(
        "reset-zoom-event",
        chart.crosshair.resetZoomEventHandler
      );
    }
  },

  panZoom: function(chart, increment) {
    if (chart.crosshair.originalData.length === 0) {
      return;
    }
    const diff = chart.crosshair.end - chart.crosshair.start;
    const min = chart.crosshair.min;
    const max = chart.crosshair.max;
    if (increment < 0) {
      // left
      chart.crosshair.start = Math.max(chart.crosshair.start + increment, min);
      chart.crosshair.end =
        chart.crosshair.start === min
          ? min + diff
          : chart.crosshair.end + increment;
    } else {
      // right
      chart.crosshair.end = Math.min(
        chart.crosshair.end + increment,
        chart.crosshair.max
      );
      chart.crosshair.start =
        chart.crosshair.end === max
          ? max - diff
          : chart.crosshair.start + increment;
    }

    this.doZoom(chart, chart.crosshair.start, chart.crosshair.end);
  },

  getOption: function(chart, category, name) {
    return helpers.getValueOrDefault(
      chart.options.plugins.crosshair[category]
        ? chart.options.plugins.crosshair[category][name]
        : undefined,
      defaultOptions[category][name]
    );
  },

  getXScale: function(chart) {
    return chart.data.datasets.length
      ? chart.scales[chart.getDatasetMeta(0).xAxisID]
      : null;
  },
  getYScale: function(chart) {
    return chart.scales[chart.getDatasetMeta(0).yAxisID];
  },

  handleSyncEvent: function(chart, e) {
    const syncGroup = this.getOption(chart, "sync", "group");

    // stop if the sync event was fired from this chart
    if (e.chartId === chart.id) {
      return;
    }

    // stop if the sync event was fired from a different group
    if (e.syncGroup !== syncGroup) {
      return;
    }

    const xScale = this.getXScale(chart);

    if (!xScale) {
      return;
    }

    // Safari fix
    let buttons =
      e.original.native.buttons === undefined
        ? e.original.native.which
        : e.original.native.buttons;
    if (e.original.type === "mouseup") {
      buttons = 0;
    }

    var newEvent = {
      type: e.original.type,
      chart: chart,
      x: xScale.getPixelForValue(e.xValue),
      y: e.original.y,
      native: {
        buttons: buttons
      },
      stop: true
    };
    chart.controller.eventHandler(newEvent);
  },

  afterEvent: function(chart, e) {
    if (chart.config.options.scales.xAxes.length === 0) {
      return;
    }
    const xScaleType = chart.config.options.scales.xAxes[0].type;
    if (xScaleType !== "linear" && xScaleType !== "time") {
      return;
    }

    const xScale = this.getXScale(chart);
    if (!xScale) {
      return;
    }
    // fix for Safari
    let buttons =
      e.native.buttons === undefined ? e.native.which : e.native.buttons;
    if (e.native.type === "mouseup") {
      buttons = 0;
    }

    const syncEnabled = this.getOption(chart, "sync", "enabled");
    const syncGroup = this.getOption(chart, "sync", "group");

    // fire event for all other linked charts
    if (!e.stop && syncEnabled) {
      const event = new CustomEvent("sync-event");
      event.chartId = chart.id;
      event.syncGroup = syncGroup;
      event.original = e;
      event.xValue = xScale.getValueForPixel(e.x);
      window.dispatchEvent(event);
    }

    // suppress tooltips for linked charts
    const suppressTooltips = this.getOption(chart, "sync", "suppressTooltips");

    chart.crosshair.suppressTooltips = e.stop && suppressTooltips;

    chart.crosshair.enabled =
      e.type !== "mouseout" &&
      (e.x > xScale.getPixelForValue(xScale.min) &&
        e.x < xScale.getPixelForValue(xScale.max));

    if (!chart.crosshair.enabled) {
      if (e.x > xScale.getPixelForValue(xScale.max)) {
        chart.update();
      }
      return true;
    }

    // handle drag to zoom
    const zoomEnabled = this.getOption(chart, "zoom", "enabled");

    if (buttons === 1 && !chart.crosshair.dragStarted && zoomEnabled) {
      chart.crosshair.dragStartX = e.x;
      chart.crosshair.dragStarted = true;
    }

    // handle drag to zoom
    if (chart.crosshair.dragStarted && buttons === 0) {
      chart.crosshair.dragStarted = false;

      const start = xScale.getValueForPixel(chart.crosshair.dragStartX);
      const end = xScale.getValueForPixel(chart.crosshair.x);

      if (Math.abs(chart.crosshair.dragStartX - chart.crosshair.x) > 1) {
        this.doZoom(chart, start, end);
      }
      chart.update();
    }

    chart.crosshair.x = e.x;

    chart.draw();
  },
  afterDraw: function(chart) {
    if (!chart.crosshair.enabled) {
      return;
    }

    if (chart.crosshair.dragStarted) {
      this.drawZoombox(chart);
    } else {
      this.drawTraceLine(chart);
      this.interpolateValues(chart);
      this.drawTracePoints(chart);
    }

    return true;
  },

  beforeTooltipDraw: function(chart) {
    // suppress tooltips on dragging
    return !chart.crosshair.dragStarted && !chart.crosshair.suppressTooltips;
  },

  resetZoom: function(chart) {
    const stop =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const update =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (update) {
      for (
        var datasetIndex = 0;
        datasetIndex < chart.data.datasets.length;
        datasetIndex++
      ) {
        var dataset = chart.data.datasets[datasetIndex];
        dataset.data = chart.crosshair.originalData.shift(0);
      }

      var range = "ticks";

      if (chart.options.scales.xAxes[0].time) {
        range = "time";
      }
      // reset original xRange
      if (chart.crosshair.originalXRange.min) {
        chart.options.scales.xAxes[0][range].min =
          chart.crosshair.originalXRange.min;
        chart.crosshair.originalXRange.min = null;
      } else {
        delete chart.options.scales.xAxes[0][range].min;
      }
      if (chart.crosshair.originalXRange.max) {
        chart.options.scales.xAxes[0][range].max =
          chart.crosshair.originalXRange.max;
        chart.crosshair.originalXRange.max = null;
      } else {
        delete chart.options.scales.xAxes[0][range].max;
      }
    }

    if (chart.crosshair.button && chart.crosshair.button.parentNode) {
      chart.crosshair.button.parentNode.removeChild(chart.crosshair.button);
      chart.crosshair.button = false;
    }

    const syncEnabled = this.getOption(chart, "sync", "enabled");
    if (!stop && update && syncEnabled) {
      const syncGroup = this.getOption(chart, "sync", "group");
      const event = new CustomEvent("reset-zoom-event");
      event.chartId = chart.id;
      event.syncGroup = syncGroup;
      window.dispatchEvent(event);
    }
    if (update) {
      const anim = chart.options.animation;
      chart.options.animation = false;
      chart.update();
      chart.options.animation = anim;
    }
  },

  doZoom: function(chart, start, end) {
    // swap start/end if user dragged from right to left
    if (start > end) {
      const tmp = start;
      start = end;
      end = tmp;
    }
    // notify delegate
    const beforeZoomCallback = helpers.getValueOrDefault(
      chart.options.plugins.crosshair.callbacks
        ? chart.options.plugins.crosshair.callbacks.beforeZoom
        : undefined,
      defaultOptions.callbacks.beforeZoom
    );

    if (!beforeZoomCallback(start, end)) {
      return false;
    }

    if (chart.options.scales.xAxes[0].type === "time") {
      if (
        chart.options.scales.xAxes[0].time.min &&
        chart.crosshair.originalData.length === 0
      ) {
        chart.crosshair.originalXRange.min =
          chart.options.scales.xAxes[0].time.min;
      }
      if (
        chart.options.scales.xAxes[0].time.max &&
        chart.crosshair.originalData.length === 0
      ) {
        chart.crosshair.originalXRange.max =
          chart.options.scales.xAxes[0].time.max;
      }
    } else {
      if (
        chart.options.scales.xAxes[0].ticks.min &&
        chart.crosshair.originalData.length === undefined
      ) {
        chart.crosshair.originalXRange.min =
          chart.options.scales.xAxes[0].ticks.min;
      }
      if (
        chart.options.scales.xAxes[0].ticks.max &&
        chart.crosshair.originalData.length === undefined
      ) {
        chart.crosshair.originalXRange.max =
          chart.options.scales.xAxes[0].ticks.max;
      }
    }
    if (!chart.crosshair.button) {
      // add restore zoom button
      const button = document.createElement("button");

      const buttonText = this.getOption(chart, "zoom", "zoomButtonText");
      const buttonClass = this.getOption(chart, "zoom", "zoomButtonClass");

      const buttonLabel = document.createTextNode(buttonText);
      button.appendChild(buttonLabel);
      button.className = buttonClass;
      button.addEventListener(
        "click",
        function() {
          this.resetZoom(chart);
        }.bind(this)
      );
      chart.canvas.parentNode.appendChild(button);
      chart.crosshair.button = button;
    }

    // set axis scale
    if (chart.options.scales.xAxes[0].time) {
      chart.options.scales.xAxes[0].time.min = start;
      chart.options.scales.xAxes[0].time.max = end;
    } else {
      chart.options.scales.xAxes[0].ticks.min = start;
      chart.options.scales.xAxes[0].ticks.max = end;
    }

    // make a copy of the original data for later restoration
    const storeOriginals = chart.crosshair.originalData.length === 0;
    // filter dataset

    for (
      let datasetIndex = 0;
      datasetIndex < chart.data.datasets.length;
      datasetIndex++
    ) {
      const newData = [];

      let index = 0;
      let started = false;
      let stop = false;
      if (storeOriginals) {
        chart.crosshair.originalData[datasetIndex] =
          chart.data.datasets[datasetIndex].data;
      }

      const sourceDataset = chart.crosshair.originalData[datasetIndex];

      for (
        let oldDataIndex = 0;
        oldDataIndex < sourceDataset.length;
        oldDataIndex++
      ) {
        const oldData = sourceDataset[oldDataIndex];
        const oldDataX = this.getXScale(chart).getRightValue(oldData);

        // append one value outside of bounds
        if (oldDataX >= start && !started && index > 0) {
          newData.push(sourceDataset[index - 1]);
          started = true;
        }
        if (oldDataX >= start && oldDataX <= end) {
          newData.push(oldData);
        }
        if (oldDataX > end && !stop && index < sourceDataset.length) {
          newData.push(oldData);
          stop = true;
        }
        index += 1;
      }

      chart.data.datasets[datasetIndex].data = newData;
    }

    chart.crosshair.start = start;
    chart.crosshair.end = end;

    if (storeOriginals) {
      const xAxes = this.getXScale(chart);
      chart.crosshair.min = xAxes.min;
      chart.crosshair.max = xAxes.max;
    }

    chart.update();

    const afterZoomCallback = this.getOption(chart, "callbacks", "afterZoom");

    afterZoomCallback(start, end);
  },

  drawZoombox: function(chart) {
    const yScale = this.getYScale(chart);

    const borderColor = this.getOption(chart, "zoom", "zoomboxBorderColor");
    const fillColor = this.getOption(chart, "zoom", "zoomboxBackgroundColor");

    chart.ctx.beginPath();
    chart.ctx.rect(
      chart.crosshair.dragStartX,
      yScale.getPixelForValue(yScale.max),
      chart.crosshair.x - chart.crosshair.dragStartX,
      yScale.getPixelForValue(yScale.min) - yScale.getPixelForValue(yScale.max)
    );
    chart.ctx.lineWidth = 1;
    chart.ctx.strokeStyle = borderColor;
    chart.ctx.fillStyle = fillColor;
    chart.ctx.fill();
    chart.ctx.fillStyle = "";
    chart.ctx.stroke();
    chart.ctx.closePath();
  },

  drawTraceLine: function(chart) {
    const yScale = this.getYScale(chart);

    const lineWidth = this.getOption(chart, "line", "width");
    const color = this.getOption(chart, "line", "color");

    chart.ctx.beginPath();
    chart.ctx.moveTo(chart.crosshair.x, yScale.getPixelForValue(yScale.max));
    chart.ctx.lineWidth = lineWidth;
    chart.ctx.strokeStyle = color;
    chart.ctx.lineTo(chart.crosshair.x, yScale.getPixelForValue(yScale.min));
    chart.ctx.stroke();
  },
  drawTracePoints: function(chart) {
    for (
      let chartIndex = 0;
      chartIndex < chart.data.datasets.length;
      chartIndex++
    ) {
      const dataset = chart.data.datasets[chartIndex];
      const meta = chart.getDatasetMeta(chartIndex);

      const yScale = chart.scales[meta.yAxisID];

      if (meta.hidden || !dataset.interpolate) {
        continue;
      }

      chart.ctx.beginPath();
      chart.ctx.arc(
        chart.crosshair.x,
        yScale.getPixelForValue(dataset.interpolatedValue),
        3,
        0,
        2 * Math.PI,
        false
      );
      chart.ctx.fillStyle = "white";
      chart.ctx.lineWidth = 2;
      chart.ctx.strokeStyle = dataset.borderColor;
      chart.ctx.fill();
      chart.ctx.stroke();
    }
  },

  interpolateValues: function(chart) {
    for (
      let chartIndex = 0;
      chartIndex < chart.data.datasets.length;
      chartIndex++
    ) {
      const dataset = chart.data.datasets[chartIndex];

      const meta = chart.getDatasetMeta(chartIndex);

      const xScale = chart.scales[meta.xAxisID];
      const xValue = xScale.getValueForPixel(chart.crosshair.x);

      if (meta.hidden || !dataset.interpolate) {
        continue;
      }

      const data = dataset.data;
      const index = data.findIndex(function(o) {
        return o.x >= xValue;
      });
      const prev = data[index - 1];
      const next = data[index];

      if (chart.data.datasets[chartIndex].steppedLine && prev) {
        dataset.interpolatedValue = prev.y;
      } else if (prev && next) {
        var slope = (next.y - prev.y) / (next.x - prev.x);
        dataset.interpolatedValue = prev.y + (xValue - prev.x) * slope;
      } else {
        dataset.interpolatedValue = NaN;
      }
    }
  }
};
// Chart.plugins.register(crosshairPlugin);
export default crosshairPlugin;
