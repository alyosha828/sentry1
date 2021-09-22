<script>
import crosshairPlugin from "../plugins/chartjs-crosshair-plugin";
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: Object,
  },
  data() {
    return {};
  },
  mounted() {
    this.addPlugin(crosshairPlugin);
    this.renderChart(this.chartData, this.options);
  },
};
</script>
