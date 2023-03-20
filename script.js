import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


//textures

const textureLoader = new THREE.TextureLoader()
const coverColorTexture = textureLoader.load("/textures/leafTextures/leafColor.jpg")
const coverAOTexture = textureLoader.load("/textures/leafTextures/leafAO.jpg")
const coverNormalTexture = textureLoader.load("/textures/leafTextures/leafNormal.jpg")
const coverOpacityTexture = textureLoader.load("/textures/leafTextures/leafOpacity.jpg")
const coverRoughnessTexture = textureLoader.load("/textures/leafTextures/leafRoughness.jpg")
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
const material = new THREE.MeshBasicMaterial({color: "purple"})

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const cylinder1 = new THREE.Mesh(
    //1/4 cylinder
    //new THREE.CylinderGeometry(.5, .5, 1,32, 1,false,0,Math.PI*0.5),
    new THREE.CylinderGeometry(.5, .5, 1,32),
   material

)
cylinder1.position.x = 1.5

//scene.add(sphere, plane, cylinder1)
scene.add(plane, cylinder1)
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


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()