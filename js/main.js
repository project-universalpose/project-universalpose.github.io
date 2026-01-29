// UniversalPose Interactive Visualization

document.addEventListener('DOMContentLoaded', function() {
    // State
    let samples = {};
    let currentModality = null;
    let currentIndex = 0;
    let baselineNames = {
        'wifi-csi': 'MetaFi',
        'mmwave': 'Point Transformer',
        'lidar': 'Point Transformer',
        'depth': 'A2J',
        'tsp': 'TSP2Pose',
        'wifi-csi2': 'MetaFi++'
    };

    // DOM Elements
    const modalityItems = document.querySelectorAll('.modality-item[data-modality]');
    const visualizeBtn = document.getElementById('visualize-btn');
    const currentModalitySpan = document.getElementById('current-modality');
    const baselineNameH3 = document.getElementById('baseline-name');

    // Image elements
    const signalImg = document.getElementById('signal-img');
    const gtImg = document.getElementById('gt-img');
    const universalposeImg = document.getElementById('universalpose-img');
    const baselineImg = document.getElementById('baseline-img');

    // Placeholder elements
    const signalPlaceholder = document.getElementById('signal-placeholder');
    const gtPlaceholder = document.getElementById('gt-placeholder');
    const universalposePlaceholder = document.getElementById('universalpose-placeholder');
    const baselinePlaceholder = document.getElementById('baseline-placeholder');

    const navItems = document.querySelectorAll('.nav-item');

    // Load samples manifest
    async function loadSamples() {
        try {
            const response = await fetch('data/samples.json');
            samples = await response.json();
            console.log('Samples loaded:', Object.keys(samples));
        } catch (error) {
            console.error('Failed to load samples:', error);
        }
    }

    // Select modality
    function selectModality(modality, baseline) {
        // Update active state
        modalityItems.forEach(item => item.classList.remove('active'));
        const selectedItem = document.querySelector(`[data-modality="${modality}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        // Update state
        currentModality = modality;
        currentIndex = 0;

        // Update UI
        const displayNames = {
            'wifi-csi': 'WiFi-CSI',
            'mmwave': 'mmWave',
            'lidar': 'LiDAR',
            'depth': 'Depth',
            'tsp': 'TSP (acoustic)',
            'wifi-csi2': 'WiFi-CSI (Multi receiver)'
        };
        currentModalitySpan.textContent = displayNames[modality] || modality;
        baselineNameH3.textContent = baselineNames[modality] || 'Expert Baseline';
        visualizeBtn.disabled = false;

        // Show first sample
        showCurrentSample();
    }

    // Show current sample
    function showCurrentSample() {
        if (!currentModality || !samples[currentModality]) {
            return;
        }

        const sampleFiles = samples[currentModality];
        if (sampleFiles.length === 0) {
            return;
        }

        const filename = sampleFiles[currentIndex];

        // Build paths for new directory structure
        const signalPath = `data/samples/${currentModality}/signals/${filename}`;
        const gtPath = `data/samples/${currentModality}/poses-universalpose/${filename}`;  // GT from any poses file (right half)
        const universalposePath = `data/samples/${currentModality}/poses-universalpose/${filename}`;
        const baselinePath = `data/samples/${currentModality}/poses-baseline/${filename}`;

        // Update signal image
        signalImg.src = signalPath;
        signalImg.classList.add('visible');
        signalPlaceholder.classList.add('hidden');

        // Update GT image (right half of poses)
        gtImg.src = gtPath;
        gtImg.classList.add('visible');
        gtPlaceholder.classList.add('hidden');

        // Update prediction images (left half of poses)
        universalposeImg.src = universalposePath;
        universalposeImg.classList.add('visible');
        universalposePlaceholder.classList.add('hidden');

        baselineImg.src = baselinePath;
        baselineImg.classList.add('visible');
        baselinePlaceholder.classList.add('hidden');

        // Handle image load errors
        signalImg.onerror = function() {
            this.classList.remove('visible');
            signalPlaceholder.classList.remove('hidden');
            signalPlaceholder.textContent = 'Image not available';
        };
        gtImg.onerror = function() {
            this.classList.remove('visible');
            gtPlaceholder.classList.remove('hidden');
            gtPlaceholder.textContent = 'Image not available';
        };
        universalposeImg.onerror = function() {
            this.classList.remove('visible');
            universalposePlaceholder.classList.remove('hidden');
            universalposePlaceholder.textContent = 'Image not available';
        };
        baselineImg.onerror = function() {
            this.classList.remove('visible');
            baselinePlaceholder.classList.remove('hidden');
            baselinePlaceholder.textContent = 'Image not available';
        };
    }

    // Cycle to next sample
    function nextSample() {
        if (!currentModality || !samples[currentModality]) {
            return;
        }

        const sampleFiles = samples[currentModality];
        currentIndex = (currentIndex + 1) % sampleFiles.length;
        showCurrentSample();
    }

    // Navigation active state
    function updateNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Event Listeners
    modalityItems.forEach(item => {
        item.addEventListener('click', function() {
            const modality = this.dataset.modality;
            const baseline = this.dataset.baseline;
            if (modality) {
                selectModality(modality, baseline);
            }
        });
    });

    visualizeBtn.addEventListener('click', nextSample);
    window.addEventListener('scroll', updateNavOnScroll);

    // Initialize
    loadSamples();
    updateNavOnScroll();
});
