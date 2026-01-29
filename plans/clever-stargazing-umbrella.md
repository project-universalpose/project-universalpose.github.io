# UniversalPose Project Page - Implementation Plan

## Overview
Create an academic project page for UniversalPose (ICML 2026), a unified multi-modal human pose estimation framework. The page will feature an interactive visualization comparing UniversalPose predictions against modality-specific expert models.

## Project Structure

```
project-universalpose.github.io/
├── index.html                    # Main HTML page
├── css/
│   └── style.css                 # All styles (DexMachina-inspired)
├── js/
│   └── main.js                   # Interactive visualization logic
├── assets/
│   └── images/
│       ├── teaser.png            # Converted from ICML-teaser.pdf
│       ├── model-pipeline.png    # Converted from icml-model-pipeline.pdf
│       └── pca-visualization.png # Converted from feature_vis_block_3.pdf
└── data/
    ├── samples.json              # Manifest of sample filenames
    └── samples/                  # Organized by modality
        ├── wifi-csi/
        │   ├── universalpose/    # exp157 images
        │   └── metafi/           # exp001 images
        ├── mmwave/
        │   ├── universalpose/
        │   └── point-transformer/
        ├── lidar/
        │   ├── universalpose/
        │   └── point-transformer/
        ├── depth/
        │   ├── universalpose/
        │   └── a2j/
        ├── tsp/
        │   ├── universalpose/
        │   └── tsp2pose/
        └── wifi-csi2/
            ├── universalpose/
            └── metafi-plus/
```

## Page Sections

### 1. Header
- Title: "UniversalPose"
- Subtitle: "A Unified Multi-Modal Framework for Human Pose Estimation"
- Authors: "Anonymous Authors" (double-blind review)
- Venue: ICML 2026 (Under review)
- Links: Paper, Code (placeholder)

### 2. Teaser Section
- Display `ICML-teaser.pdf` (converted to PNG)
- Shows joint-training and fusion capabilities

### 3. Interactive Visualization (Core Feature)
**Layout:**
- Center: "UniversalPose" in a circular node
- Hexagonal arrangement of 6 modality expert models around it:
  - WiFi-CSI → MetaFi
  - mmWave → Point Transformer (M)
  - LiDAR → Point Transformer (L)
  - Depth → A2J
  - TSP → TSP2Pose
  - WiFi-CSI2 → MetaFi++

**Interaction:**
- Click on any hexagon to select that modality
- "Visualize Next Predictions" button cycles through samples
- Displays side-by-side comparison:
  - Left: UniversalPose prediction (signal + red skeleton + blue GT)
  - Right: Expert model prediction (same format)
- Legend: Red = Prediction, Blue = Ground Truth

### 4. Model Architecture Section
- Display `icml-model-pipeline.pdf` (converted to PNG)
- Brief description of Universal Transformer and MoCA

### 5. MoCA Analysis Section
- Display `feature_vis_block_3.pdf` (converted to PNG)
- Explanation of 4 panels:
  - **Ours (Full)**: Features well-aligned across modalities
  - **w/o MoCA (Full)**: Some clustering by modality
  - **Ours (Small)**: MoCA maintains alignment even with less data
  - **w/o MoCA (Small)**: Strong modality clustering, poor generalization

### 6. Citation Section
- BibTeX entry (placeholder for now)

## Source Files Mapping

| Asset | Source Path |
|-------|-------------|
| Teaser | `/home/ubuntu/slocal1/MMPose/ICML2026/paper-materials/images/ICML-teaser.pdf` |
| Model Figure | `/home/ubuntu/slocal1/MMPose/ICML2026/paper-materials/images/icml-model-pipeline.pdf` |
| PCA Visualization | `/home/ubuntu/slocal1/MMPose/ICML2026/figures/pca-n1000/feature_vis_block_3.pdf` |

| Experiment | Source Path | Modality | Model Name |
|------------|-------------|----------|------------|
| exp157 | `images/exp157/{modality}/signal-pose-pairs/` | All 6 | UniversalPose |
| exp001 | `images/exp001/wifi-csi_E01/signal-pose-pairs/` | WiFi-CSI | MetaFi |
| exp003 | `images/exp003/lidar_E03/signal-pose-pairs/` | LiDAR | Point Transformer (L) |
| exp016 | `images/exp016/wifi-csi2_E06/signal-pose-pairs/` | WiFi-CSI2 | MetaFi++ |
| exp039 | `images/exp039/mmwave_E02/signal-pose-pairs/` | mmWave | Point Transformer (M) |
| exp045 | `images/exp045/depth_E04/signal-pose-pairs/` | Depth | A2J |
| exp046 | `images/exp046/tsp_E05/signal-pose-pairs/` | TSP | TSP2Pose |

## Implementation Steps

### Step 1: Setup & PDF Conversion
```bash
# Create directories
mkdir -p css js assets/images data/samples

# Convert PDFs to PNG using pdftoppm
pdftoppm -png -r 200 /home/ubuntu/slocal1/MMPose/ICML2026/paper-materials/images/ICML-teaser.pdf assets/images/teaser
pdftoppm -png -r 200 /home/ubuntu/slocal1/MMPose/ICML2026/paper-materials/images/icml-model-pipeline.pdf assets/images/model-pipeline
pdftoppm -png -r 200 /home/ubuntu/slocal1/MMPose/ICML2026/figures/pca-n1000/feature_vis_block_3.pdf assets/images/pca-visualization
```

### Step 2: Copy & Organize Sample Images
Copy **15-20 representative samples** per modality for both UniversalPose and baselines.

**Selection criteria:**
- Diverse poses (standing, sitting, walking, arm movements)
- Good prediction quality examples
- A few challenging cases to show robustness

### Step 3: Create HTML Structure
- Sidebar navigation (DexMachina-style)
- All 6 sections with semantic structure
- Hexagonal grid layout for modality selector

### Step 4: CSS Styling
- Clean academic aesthetic
- Hexagonal layout using CSS Grid
- Responsive design (breakpoint at 768px)
- Smooth transitions and hover effects

### Step 5: JavaScript Interactivity
- Load samples.json manifest
- Handle hexagon clicks to select modality
- Handle "Visualize" button to cycle samples
- Update comparison display with current images

### Step 6: Generate samples.json
Create manifest mapping each modality to its available sample filenames.

## Verification Plan

1. **Visual Check**: Open index.html in browser
   - Verify teaser image displays correctly
   - Verify hexagonal layout renders properly
   - Test responsive design at different widths

2. **Interactive Test**:
   - Click each modality hexagon - should highlight
   - Click "Visualize" button - should show comparison
   - Verify images load for all 6 modalities
   - Verify both UniversalPose and baseline images appear

3. **Content Verification**:
   - Model figure displays correctly
   - PCA visualization shows 4 panels clearly
   - MoCA explanation is accurate

4. **Cross-browser Test**:
   - Chrome, Firefox, Safari
   - Mobile viewport

## Estimated File Sizes
- PDF assets (converted to PNG): ~3-5 MB
- Sample images (15-20 x 6 modalities x 2 models): ~100-150 MB
- After optimization: ~50-80 MB (suitable for GitHub Pages)
