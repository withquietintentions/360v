//import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import imageSource from "./Cover.jpg"


// /**
//  * Textures
//  */


const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () =>
{
    console.log('loadingManager: loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loadingManager: loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loadingManager: loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loadingManager: loading error')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load("./textures/leafTextures/leafColor.jpg")
const colorTexture1 = textureLoader.load("./textures/bamboo/bambooBW.jpg")
const colorTexture2 = textureLoader.load("./textures/bamboo/bambooLeaf.jpeg")
const colorTexture3 = textureLoader.load("./textures/bamboo/greenBambooLeaves.jpeg")
const colorTexture4 = textureLoader.load("./textures/bamboo/bambooForestMaui.jpg")
const AOTexture = textureLoader.load("./textures/leafTextures/leafAO.jpg")
const normalTexture = textureLoader.load("./textures/leafTextures/leafNormal.jpg")
const opacityTexture = textureLoader.load("./textures/leafTextures/leafOpacity.jpg")
const roughnessTexture = textureLoader.load("./textures/leafTextures/leafRoughness.jpg")


// // const colorTexture = textureLoader.load('./textures/checkerboard-1024x1024.png')
// // const colorTexture = textureLoader.load('./textures/checkerboard-2x2.png')
// const colorTexture = textureLoader.load(
//     '/textures/minecraft.png',
//     () =>
//     {
//         console.log('textureLoader: loading finished')
//     },
//     () =>
//     {
//         console.log('textureLoader: loading progressing')
//     },
//     () =>
//     {
//         console.log('textureLoader: loading error')
//     }
// )
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping
// // colorTexture.repeat.x = 2
// // colorTexture.repeat.y = 3
// // colorTexture.offset.x = 0.5
// // colorTexture.offset.y = 0.5
// // colorTexture.rotation = Math.PI * 0.25
// // colorTexture.center.x = 0.5
// // colorTexture.center.y = 0.5
// colorTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter

// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

colorTexture2.repeat.x =2;
colorTexture2.repeat.y =3;
colorTexture2.wrapS = THREE.RepeatWrapping
colorTexture2.wrapT= THREE.RepeatWrapping
/**
 * Base 
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//material
/**
 * Objects
 */
const material = new THREE.MeshBasicMaterial({map:colorTexture3})
const material1 = new THREE.MeshBasicMaterial({map:colorTexture2})
const material2 = new THREE.MeshBasicMaterial({map:colorTexture4})

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material1
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1),
    material2
)

const cylinder1 = new THREE.Mesh(
    //1/4 cylinder
    //new THREE.CylinderGeometry(.5, .5, 1,32, 1,false,0,Math.PI*0.5),
    new THREE.CylinderGeometry(.5, .5, 1,32),
   material

)
cylinder1.position.x = 1.5

//scene.add(sphere, plane, cylinder1)
scene.add(sphere, plane, cylinder1)
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    cylinder1.rotation.y = 0.1 * elapsedTime
    cylinder1.rotation.x = 0.1 * elapsedTime

    sphere.rotation.y = 0.15 * elapsedTime
    sphere.rotation.x = 0.1 * elapsedTime


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()