# WebAR Dynamic Model Placement

## Overview

This project is a WebAR experience built using 8th Wall and A-Frame. Users can place a 3D object in the real world, switch between multiple models, and interact with them using touch gestures.

## Features

### Dynamic Model Loading

* 3D models are hosted on AWS.
* Models are loaded from remote URLs at runtime.
* Available models:

  * House
  * Car
  * Tractor

### Tap-to-Place

1. User scans the environment.
2. Plane detection identifies a valid surface.
3. User taps on the ground.
4. The selected model is placed at the detected world position.

### Model Switching

After the first placement:

* Model selection buttons become visible.
* User can switch between House, Car, and Tractor.
* All models share the same placement position.
* Only the selected model is visible at a time.

### Position Persistence

When a model is placed:

* The world position is stored.
* Switching models reuses the same saved position.
* Newly selected models appear exactly where the original model was placed.

### Re-Anchoring Behavior

To improve stability:

* The placed object maintains its world position.
* If the object leaves the camera view and returns later, it remains anchored in the previously detected world location or the system searches for the nearest valid detected surface.
* The experience continuously updates tracking using the detected surface.

### Touch Interactions

#### Single Finger Rotation

* Drag with one finger to rotate the active model around the Y-axis.

#### Two Finger Pinch

* Pinch outward to scale up the model.
* Pinch inward to scale down the model.

## Architecture

User
↓
Camera Feed
↓
8th Wall SLAM / Plane Detection
↓
Tap-To-Place System
↓
Store Placement Position
↓
Model Manager
├── House
├── Car
└── Tractor
↓
Gesture Controls
├── Rotation (1 Finger)
└── Scale (2 Finger)

## Asset Pipeline

AWS S3
↓
GLB Models
↓
A-Frame Assets
↓
Scene Initialization
↓
Runtime Model Switching

## Performance Optimizations

* Models loaded once during page initialization.
* Asset preloading prevents switching delays.
* Only one model is visible at a time.
* Shared transform data reduces memory usage.
* Mobile-optimized GLB assets.
* Minimal draw calls for improved FPS.

## Technologies

* 8th Wall
* A-Frame
* JavaScript
* HTML5
* AWS S3
* Netlify
