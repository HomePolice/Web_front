<template>
    <div id="graph" class="block">
        <div id="netchart"></div>
    </div>
</template>

<script>
export default {
  name: 'network',
  mounted () {
    let scripts = document.createElement('script')
    scripts.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.min.js')
    document.head.appendChild(scripts)
    scripts.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js')
    document.head.appendChild(scripts)
    scripts.setAttribute('src', '../../../src/assets/js/header.js')
    document.head.appendChild(scripts)
    scripts.setAttribute('src', 'https://cdn.plot.ly/plotly-latest.min.js')
    document.head.appendChild(scripts)
    scripts.setAttribute('src', 'https://cdn.zoomcharts-cloud.com/1/latest/zoomcharts.js')
    document.head.appendChild(scripts)
    scripts.setAttribute('src', '../../../assets/js/page.js')
    document.body.appendChild(scripts)
  }
}
</script>
