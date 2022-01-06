// Canvas
const canvas = document.querySelector('canvas.webgl')

// GUI


// Scene 
const scene = new THREE.Scene()

// Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10)
camera.position.set(-2,2,0)
scene.add(camera)

// Helpers
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

// Controls 
const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true 

/**
 * RENDERER 
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.CineonToneMapping
renderer.toneMappingExposure = 5

/**
 * LIGHTS
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.05)
const pointLight = new THREE.PointLight('#ffffff', 0.5, 10, 5)
const rectAreaLight = new THREE.RectAreaLight('#ffffff', 2, 0.39,0.83)
const rectAreaLightHelper = new THREE.RectAreaLightHelper(rectAreaLight)
const rectAreaLightTwo = new THREE.RectAreaLight('#ffffff', 2, 0.34,0.83)
const rectAreaLightHelperTwo = new THREE.RectAreaLightHelper(rectAreaLightTwo)
const rectAreaLightThree = new THREE.RectAreaLight('#ffffff', 2, 0.34,0.83)
const rectAreaLightHelperThree = new THREE.RectAreaLightHelper(rectAreaLightThree)

rectAreaLight.add(rectAreaLightHelper)
rectAreaLight.position.set(0.02,0.6,-0.85)
rectAreaLight.rotation.y = Math.PI
rectAreaLightTwo.add(rectAreaLightHelperTwo)
rectAreaLightTwo.position.set(-0.425,0.6,-0.85)
rectAreaLightTwo.rotation.y = Math.PI
rectAreaLightThree.add(rectAreaLightHelperThree)
rectAreaLightThree.position.set(0.465,0.6,-0.85)
rectAreaLightThree.rotation.y = Math.PI
pointLight.position.set(0,1.5,0)

scene.add(
    ambientLight, 
    pointLight, 
    rectAreaLight,
    rectAreaLightTwo,
    rectAreaLightThree
)

// Loader
const gltfLoader = new THREE.GLTFLoader()

// Fetching user items from EJS template
const userItems = document.getElementById('user_items').innerText.split(',')

// Adding objects to the scene 
const objectsDir = '/room-setup-objects'
userItems.forEach(item => {
    gltfLoader.load(
        `${objectsDir}${item}`,
        (gltf) => {
            console.log('The model was successfully loaded!')
            gltf.scene.scale.set(0.1, 0.1, 0.1)
            scene.add(gltf.scene)
        },
        (progress) => {
            console.log(progress)
        },
        (error) => {
            console.log(error)
        }

    )
})

// Animate 
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

// Save frame 
// const imageData = renderer.domElement.toDataURL().replace('image/png', 'image/octet-stream')

// const link = document.createElement('a')
// link.download = 'frame.jpg'
// link.href = imageData
// link.click()
// setTimeout(() => {
//     window.close()
// }, 5000)
