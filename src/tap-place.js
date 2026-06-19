export const tapPlaceComponent = {
  init() {
    const ground = document.getElementById('ground')
    const prompt = document.getElementById('promptText')

    const farmBtn = document.getElementById('farmBtn')
    const cabinBtn = document.getElementById('cabinBtn')
    const chaletBtn = document.getElementById('chaletBtn')
    const buttonPanel = document.getElementById('modelButtons')

    const scene = document.querySelector('a-scene')

    let placedModel = null
    let placed = false
    let fixedPosition = null

    const MODEL_CONFIG = {
      farm: {
        id: '#farmModel',
        scale: 1,
        yOffset: 0,
        rotationY: 0,
      },

      cabin: {
        id: '#cabinModel',
        scale: 2,
        yOffset: 5,
        rotationY: 0,
      },

      chalet: {
        id: '#chaletModel',
        scale: 0.16,
        yOffset: 0,
        rotationY: 0,
      },
    }

    function swapModel(config) {
      if (!placedModel || !fixedPosition) return

      // Preserve current scale from pinch gesture
      const currentScale = placedModel.getAttribute('scale')

      if (placedModel.parentNode) {
        placedModel.parentNode.removeChild(placedModel)
      }

      placedModel = document.createElement('a-entity')

      placedModel.setAttribute(
        'position',
        `${fixedPosition.x}
         ${fixedPosition.y + config.yOffset}
         ${fixedPosition.z}`
      )

      placedModel.setAttribute(
        'rotation',
        `0 ${config.rotationY} 0`
      )

      placedModel.setAttribute(
        'gltf-model',
        config.id
      )

      scene.appendChild(placedModel)

      placedModel.addEventListener('model-loaded', () => {
        // Apply model-specific scale
        placedModel.setAttribute(
          'scale',
          `${config.scale} ${config.scale} ${config.scale}`
        )
      })

      placedModel.setAttribute('pinch-scale', '')
      placedModel.setAttribute('two-finger-rotate', '')
    }

    farmBtn.addEventListener('click', () => {
      console.log('Farm clicked')
      swapModel(MODEL_CONFIG.farm)
    })

    cabinBtn.addEventListener('click', () => {
      console.log('Cabin clicked')
      swapModel(MODEL_CONFIG.cabin)
    })

    chaletBtn.addEventListener('click', () => {
      console.log('Chalet clicked')
      swapModel(MODEL_CONFIG.chalet)
    })

    ground.addEventListener('click', (event) => {
      if (placed) return

      prompt.style.display = 'none'

      const touchPoint = event.detail.intersection.point

      fixedPosition = {
        x: touchPoint.x,
        y: touchPoint.y,
        z: touchPoint.z,
      }

      placedModel = document.createElement('a-entity')

      placedModel.setAttribute(
        'position',
        `${fixedPosition.x}
         ${fixedPosition.y + MODEL_CONFIG.farm.yOffset}
         ${fixedPosition.z}`
      )

      placedModel.setAttribute(
        'rotation',
        `0 ${MODEL_CONFIG.farm.rotationY} 0`
      )

      placedModel.setAttribute(
        'gltf-model',
        MODEL_CONFIG.farm.id
      )

      placedModel.setAttribute(
        'scale',
        `${MODEL_CONFIG.farm.scale}
         ${MODEL_CONFIG.farm.scale}
         ${MODEL_CONFIG.farm.scale}`
      )

      placedModel.setAttribute('pinch-scale', '')
      placedModel.setAttribute('two-finger-rotate', '')

      scene.appendChild(placedModel)

      buttonPanel.style.display = 'block'

      placed = true
    })
  },
}