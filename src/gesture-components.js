AFRAME.registerComponent('pinch-scale', {
  init() {
    let startDistance = 0
    let startScale = 1

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 2) return

      const dx =
        e.touches[0].clientX -
        e.touches[1].clientX

      const dy =
        e.touches[0].clientY -
        e.touches[1].clientY

      const distance =
        Math.sqrt(dx * dx + dy * dy)

      if (!startDistance) {
        startDistance = distance
        startScale = this.el.object3D.scale.x
        return
      }

      const scale =
        startScale * (distance / startDistance)

      this.el.object3D.scale.set(
        scale,
        scale,
        scale
      )
    })

    window.addEventListener('touchend', () => {
      startDistance = 0
    })
  },
})

AFRAME.registerComponent('two-finger-rotate', {
  init() {
    let lastX = null

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 2) return

      const currentX =
        (e.touches[0].clientX +
          e.touches[1].clientX) / 2

      if (lastX !== null) {
        this.el.object3D.rotation.y +=
          (currentX - lastX) * 0.01
      }

      lastX = currentX
    })

    window.addEventListener('touchend', () => {
      lastX = null
    })
  },
})