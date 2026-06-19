export const tapPlaceComponent = {
  init() {
    const ground = document.getElementById('ground')
    const prompt = document.getElementById('promptText')

    const Model_1_Btn = document.getElementById('Model1_Btn')
    const Model_2_Btn = document.getElementById('Model2_Btn')
    const Model_3_Btn = document.getElementById('Model3_Btn')
    const buttonPanel = document.getElementById('modelButtons')
    const resetBtn = document.getElementById('resetBtn')

    const scene = document.querySelector('a-scene')

    let placedModel = null
    let placed = false
    let fixedPosition = null

    const MODEL_CONFIG = {
      farmhouse: {
        id: '#FarmHouse_Model',
        scale: 0.5,
        yOffset: 0,
        rotationY: 0,
      },

      car: {
        id: '#Car_Model',
        scale: 4,
        yOffset: 0,
        rotationY: 0,
      },

      tractor: {
        id: '#Tactor_Model',
        scale: 1,
        yOffset: 0,
        rotationY: 0,
      },
    }

    function createAnimatedModel(config) {
      const model = document.createElement('a-entity')

      model.setAttribute(
        'position',
        `${fixedPosition.x}
         ${fixedPosition.y + config.yOffset}
         ${fixedPosition.z}`
      )

      model.setAttribute(
        'rotation',
        `0 ${config.rotationY} 0`
      )

      model.setAttribute('gltf-model', config.id)

      model.setAttribute('shadow', {
        cast: true,
        receive: true,
      })

      model.setAttribute('pinch-scale', '')
      model.setAttribute('one-finger-rotate', '')

      // Start tiny for pop animation
      model.setAttribute('visible', false)
      model.setAttribute('scale', '0.0001 0.0001 0.0001')

      model.addEventListener('model-loaded', () => {
        model.setAttribute('visible', true)

        model.setAttribute('animation', {
          property: 'scale',
          to: `${config.scale} ${config.scale} ${config.scale}`,
          easing: 'easeOutElastic',
          dur: 800,
        })
      })

      return model
    }

    // Function to swap models while keeping the same position
    function swapModel(config) {
      if (!placedModel || !fixedPosition) return

      if (placedModel.parentNode) {
        placedModel.parentNode.removeChild(placedModel)
      }

      placedModel = createAnimatedModel(config)

      scene.appendChild(placedModel)
    }

    // Model selection button logic
    Model_1_Btn.addEventListener('click', () => {
      console.log('Farm House clicked')
      swapModel(MODEL_CONFIG.farmhouse)
    })

    Model_2_Btn.addEventListener('click', () => {
      console.log('Car clicked')
      swapModel(MODEL_CONFIG.car)
    })

    Model_3_Btn.addEventListener('click', () => {
      console.log('Tractor clicked')
      swapModel(MODEL_CONFIG.tractor)
    })

    // Reset button logic
    resetBtn.addEventListener('click', () => {
      if (!placedModel) return

      placedModel.setAttribute('animation__drop', {
        property: 'position',
        to: `${fixedPosition.x} -3 ${fixedPosition.z}`,
        dur: 1000,
        easing: 'easeInOutCubic',
      })

      placedModel.setAttribute('animation__shrink', {
        property: 'scale',
        to: '0.01 0.01 0.01',
        dur: 1000,
        easing: 'easeInOutQuad',
      })

      setTimeout(() => {
        if (placedModel.parentNode) {
          placedModel.parentNode.removeChild(placedModel)
        }

        placedModel = null
        fixedPosition = null
        placed = false

        buttonPanel.style.display = 'none'
        resetBtn.style.display = 'none'
        prompt.style.display = 'block'
      }, 1000)
    })


    // Tap to place logic
    ground.addEventListener('click', (event) => {
      if (placed) return

      prompt.style.display = 'none'

      const touchPoint = event.detail.intersection.point

      fixedPosition = {
        x: touchPoint.x,
        y: touchPoint.y,
        z: touchPoint.z,
      }

      placedModel = createAnimatedModel(
        MODEL_CONFIG.farmhouse
      )

      scene.appendChild(placedModel)

      buttonPanel.style.display = 'block'
      resetBtn.style.display = 'block'

      placed = true
    })
  },
}