import 'vue/types/umd'
import { Stream } from './lib/stream'

declare module 'vue/types/vue' {
  interface Vue {
    $streams: Record<string, Stream<any>>
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    createStreams(): Vue['$streams'];
  }
}

export default function VueStream(vue: any) {
  vue.mixin({
    created() {
      if (this.$options.createStreams) {
        this.$streams = this.$options.createStreams()
      }
    },
    destroyed() {
      for (const stream of Object.values<any>(this.$streams || {})) {
        stream.add(null)
      }

      delete this.$streams
    }
  })
}