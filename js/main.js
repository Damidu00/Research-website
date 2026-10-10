/**
 * Faceo - FacialAnalysis-LK
 * Pure Vanilla JavaScript Client Logic
 * SLIIT Faculty of Computing Undergraduate Research
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initArchitectureStepper();
  initResearchComponents();
  initTechStackFilter();
  initDocumentsModal();
  initCitationCopy();
  initScrollToTop();
});

/* ─────────────────────────────────────────────────────────────
   1. NAVIGATION & SCROLL SPY
   ───────────────────────────────────────────────────────────── */
function initNavigation() {
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const sectionIds = ['overview', 'problem', 'architecture', 'components', 'tech-stack', 'documents', 'team'];

  // Scroll event for sticky glass header and section spy
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    const scrollPos = window.scrollY + 220;
    let currentId = 'overview';

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const sec = document.getElementById(sectionIds[i]);
      if (sec && sec.offsetTop <= scrollPos) {
        currentId = sectionIds[i];
        break;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }
}

/* ─────────────────────────────────────────────────────────────
   2. SYSTEM ARCHITECTURE INTERACTIVE STEPPER
   ───────────────────────────────────────────────────────────── */
const PIPELINE_DATA = {
  'step-1': {
    stepNum: 'Stage 01',
    title: 'Input Acquisition',
    subtitle: 'Webcam & Unconstrained Image Capture',
    description: 'Accepts real-time browser video streams (30 FPS) or uploaded static RGB imagery sampled across Sri Lankan demographics. Accommodates varied head poses (±30° yaw/pitch) and non-uniform illumination environments.',
    tech: ['WebRTC', 'Canvas API', 'Sri Lankan Demographic Samples', 'sRGB Space'],
    specs: [
      { label: 'Capture Resolution', value: '640x480 up to 1920x1080' },
      { label: 'Target Demographics', value: 'South Asian / Melanin IV & V' },
      { label: 'Stream Latency', value: '< 16ms frame acquisition' },
      { label: 'Color Space', value: 'RGB (sRGB formatted)' }
    ],
    highlight: 'Ensures unconstrained capture conditions without artificial lab constraints.',
    subtasks: null
  },
  'step-2': {
    stepNum: 'Stage 02',
    title: 'Pre-Processing & Normalization',
    subtitle: 'Face Localization & Illumination Recovery',
    description: 'Face bounding boxes are detected via SSD MobileNet V3. To counter severe low-light degradation (<15 Lux), RGB frames are converted to LAB color space where the L-channel undergoes Contrast Limited Adaptive Histogram Equalization (CLAHE) followed by parametric Gamma adjustment.',
    tech: ['SSD MobileNet V3', 'CLAHE (Clip=2.0)', 'Gamma Correction (γ=1.4)', 'LAB Color Space'],
    specs: [
      { label: 'Face Detector', value: 'SSD MobileNet V3 (99.2% recall)' },
      { label: 'CLAHE Clip Limit', value: '2.0 with 8x8 tile grid' },
      { label: 'Gamma Parameter', value: 'γ = 1.4 for low-light restoration' },
      { label: 'Alignment', value: 'Affine 5-point landmark canonical crop' }
    ],
    highlight: 'Restores high-frequency facial edge contours even in extreme shadows.',
    subtasks: null
  },
  'step-3': {
    stepNum: 'Stage 03',
    title: 'Parallel Multi-Task Execution',
    subtitle: 'Decoupled 4-Way Neural Inferencing',
    description: 'The preprocessed facial tensor is dispatched simultaneously into 4 dedicated, decoupled analytical engines to prevent inter-task interference and aggregate score masking.',
    tech: ['Custom CNN', 'Face-API.js', 'YOLO11n', 'ResNet-50 Forensics'],
    specs: [
      { label: 'Task 3A: FER', value: '5-class Custom CNN (92.32% Acc)' },
      { label: 'Task 3B: Demographics', value: 'Edge-based Browser Face-API.js (<40ms)' },
      { label: 'Task 3C: Conditions', value: 'YOLO11n (52.00% mAP@50 on 4 classes)' },
      { label: 'Task 3D: Deepfake', value: 'ResNet-50 + ELA (92.55% Generalization)' }
    ],
    highlight: 'Decoupled execution enables independent component stress-testing.',
    subtasks: [
      { code: '3A', name: 'Facial Emotion Recognition', model: 'Custom CNN + MobileNet V3', role: '5-Class Emotion (Angry, Fear, Happy, Neutral, Sad)', color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10' },
      { code: '3B', name: 'Age & Gender Estimation', model: 'Face-API.js (WASM / TF.js)', role: 'Client-side private demographic classification', color: 'border-blue-500/20 text-blue-400 bg-blue-500/10' },
      { code: '3C', name: 'Facial Condition Detection', model: 'YOLO11n (640x640)', role: 'Localization of Acne, Wrinkles, Moles & Spots', color: 'border-amber-500/20 text-amber-400 bg-amber-500/10' },
      { code: '3D', name: 'Deepfake Verification', model: 'ResNet-50 + ELA Forensics', role: 'Cross-dataset authenticity & artifact detection', color: 'border-purple-500/20 text-purple-400 bg-purple-500/10' }
    ]
  },
  'step-4': {
    stepNum: 'Stage 04',
    title: 'Integrated Holistic Output',
    subtitle: 'Multi-Dimensional Synthesis & Report',
    description: 'Synthesizes probabilistic outputs from all 4 branches into a unified diagnostic report. Cross-validates emotional state against demographic priors and correlates skin marks with authenticity confidence scores.',
    tech: ['JSON Synthesis', 'Forensic Confidence Index', 'Visual Bounding Overlay', 'Fitzpatrick Mapping'],
    specs: [
      { label: 'Output Format', value: 'Structured JSON + Canvas Overlay' },
      { label: 'Total Pipeline Time', value: '~180ms End-to-End' },
      { label: 'Forensic Metric', value: 'Multi-spectrum Authenticity Score' },
      { label: 'Demographic Flag', value: 'Fitzpatrick Melanin Contextualization' }
    ],
    highlight: 'Produces transparent, ethical, and explainable multi-task facial intelligence.',
    subtasks: null
  }
};

function initArchitectureStepper() {
  const stepButtons = document.querySelectorAll('.step-btn');
  const detailsContainer = document.getElementById('arch-step-detail-container');

  function renderStep(stepId) {
    const data = PIPELINE_DATA[stepId] || PIPELINE_DATA['step-3'];

    stepButtons.forEach((btn) => {
      if (btn.dataset.step === stepId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    let subtasksHtml = '';
    if (data.subtasks) {
      subtasksHtml = `
        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
          <div style="font-size: 0.7rem; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); margin-bottom: 0.85rem;">
            Parallel Multi-Branch Dispatches (Non-Blocking)
          </div>
          <div class="subtasks-grid">
            ${data.subtasks.map(st => `
              <div style="padding: 0.85rem; border-radius: 0.85rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: flex-start; gap: 0.75rem;">
                <div style="padding: 0.4rem 0.6rem; border-radius: 0.5rem; font-size: 0.75rem; font-family: var(--font-mono); font-weight: 600; border: 1px solid;" class="${st.color}">
                  ${st.code}
                </div>
                <div style="min-width: 0;">
                  <div style="font-size: 0.8rem; font-weight: 500; color: #fff;">${st.name}</div>
                  <div style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--text-muted); margin-top: 0.15rem;">${st.model}</div>
                  <div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 0.25rem;">${st.role}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    detailsContainer.innerHTML = `
      <div class="step-detail-grid">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-family: var(--font-mono); color: var(--emerald); margin-bottom: 0.75rem;">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--emerald);"></span>
            Stage Specification & Dataflow
          </div>
          <h3 style="font-size: 1.6rem; font-weight: 300; color: #fff; margin-bottom: 0.85rem;">
            ${data.stepNum}: ${data.title}
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.65; font-weight: 300; margin-bottom: 1.5rem;">
            ${data.description}
          </p>

          <div>
            <div style="font-size: 0.68rem; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); margin-bottom: 0.6rem;">
              Utilized Technologies & Algorithms
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${data.tech.map(t => `<span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-muted);">${t}</span>`).join('')}
            </div>
          </div>

          ${subtasksHtml}
        </div>

        <div class="specs-table">
          <div style="font-size: 0.75rem; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle); margin-bottom: 1rem;">
            Execution Parameters
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${data.specs.map(s => `
              <div>
                <span style="font-size: 0.7rem; color: var(--text-faint); display: block;">${s.label}</span>
                <span style="font-size: 0.825rem; font-family: var(--font-mono); color: #fff; margin-top: 0.15rem; display: block;">${s.value}</span>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); font-size: 0.75rem; color: #6ee7b7; background: rgba(16,185,129,0.06); padding: 0.75rem; border-radius: 0.75rem; border: 1px solid rgba(16,185,129,0.2); line-height: 1.5;">
            💡 ${data.highlight}
          </div>
        </div>
      </div>
    `;
  }

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      renderStep(btn.dataset.step);
    });
  });

  // Default step
  renderStep('step-3');
}

/* ─────────────────────────────────────────────────────────────
   3. THE 4 RESEARCH COMPONENTS (TABS)
   ───────────────────────────────────────────────────────────── */
const COMPONENTS_DATA = {
  fer: {
    tag: 'Component 01',
    title: 'Facial Emotion Recognition (FER)',
    leadResearcher: 'Damidu',
    shortDesc: '5-class emotion classification (Angry, Fear, Happy, Neutral, Sad) under normal and low illumination.',
    pipeline: [
      'SSD MobileNet V3 (Localization)',
      'CLAHE (L-Channel Equalization)',
      'Parametric Gamma Correction',
      'Custom Deep CNN Classifier'
    ],
    metrics: [
      { label: 'Test Accuracy', value: '92.32%', badge: 'Overall' },
      { label: 'Macro F1-Score', value: '92.33%', badge: 'Balanced' },
      { label: 'Happy Class F1', value: '96.11%', badge: 'Highest F1' },
      { label: 'Angry Class Recall', value: '100.0%', badge: '80.0% Prec.' }
    ],
    keyInsights: [
      'Happy yielded the highest F1-score (96.11%) due to distinct zygomatic major muscle contraction.',
      'Angry attained 100% recall but 80.00% precision due to visual overlap with neutral and sad brows in lower lighting.',
      'CLAHE combined with Gamma correction successfully overcame illumination degradation, preventing high-frequency feature loss on Melanin IV & V faces.'
    ],
    inDepth: {
      datasetInfo: 'Evaluated on a specialized composite partition of localized facial expressions combined with standard RAF-DB & FER2013 under controlled low-lux attenuation.',
      modelArchitecture: 'Custom 4-block Convolutional Neural Network with Batch Normalization, Swish activations, and Spatial Dropout, preceded by SSD MobileNet V3 canonical cropping.',
      experimentalFindings: 'Under 10 Lux illumination, unenhanced models suffered a 38.7% accuracy drop. Prepending adaptive CLAHE recovered performance to within 2.4% of standard studio lighting.'
    }
  },
  demographics: {
    tag: 'Component 02',
    title: 'Browser-Based Age & Gender Estimation',
    leadResearcher: 'Gagana',
    shortDesc: 'Client-side, privacy-preserving browser inference without cloud reliance or external API calls.',
    pipeline: [
      'Face-API.js (WASM / WebGL)',
      'TensorFlow.js Edge Engine',
      'Multi-Scale Feature Extractor',
      'Zero-Cloud Biometric Guard'
    ],
    metrics: [
      { label: 'Inference Latency', value: '< 40ms', badge: 'Live Edge' },
      { label: 'Cloud Bandwidth', value: '0 Bytes', badge: 'Privacy' },
      { label: 'FPS in Browser', value: '28-30 FPS', badge: 'Smooth' },
      { label: 'Target Demographics', value: 'Sri Lankan', badge: 'Empirical' }
    ],
    keyInsights: [
      'Demonstrated real-time, low-latency feasibility directly in mid-tier client web browsers across varied poses and lighting.',
      'Zero cloud data transmission guarantees complete GDPR and biometric data sovereignty compliance.',
      'Empirical evaluation highlighted a crucial research gap: the imperative need for larger curated and labeled Sri Lankan demographic training sets.'
    ],
    inDepth: {
      datasetInfo: 'Tested against live multi-angle webcam feeds and stratified demographic sample sets across young, middle-aged, and elderly Sri Lankan cohorts.',
      modelArchitecture: 'Lightweight quantized MobileNet-inspired dual-head neural network running through TensorFlow.js WebAssembly backend.',
      experimentalFindings: 'Browser-based edge inference successfully achieved 38ms average per-frame inferencing on standard quad-core laptops without dedicated GPU acceleration.'
    }
  },
  conditions: {
    tag: 'Component 03',
    title: 'Localized Facial-Condition Detection',
    leadResearcher: 'Sanjana',
    shortDesc: 'Spatial localization and bounding-box detection of Acne, Wrinkles, Moles, and Age Spots.',
    pipeline: [
      'YOLO11n Ultralytics Backbone',
      '640x640 High-Res Tensors',
      '100 Epochs Fine-Tuning',
      'CIoU Loss Bounding Boxes'
    ],
    metrics: [
      { label: 'mAP@50', value: '52.00%', badge: 'Overall' },
      { label: 'mAP@50-95', value: '23.64%', badge: 'Strict IoU' },
      { label: 'Overall Precision', value: '70.83%', badge: 'Low FP' },
      { label: 'Overall Recall', value: '46.91%', badge: 'Localization' }
    ],
    keyInsights: [
      'Localizing minute, irregular epidermal textures (Acne, Moles) is significantly more complex than global high-level classification.',
      'High precision (70.83%) ensures minimal false alarms, which is crucial for reliable dermatological screening.',
      'Darker skin pigmentation and non-uniform surface specular reflections pose unique challenges that benefit from multi-scale feature pyramids.'
    ],
    inDepth: {
      datasetInfo: 'Curated dataset of high-resolution facial condition annotations (Acne, Wrinkles, Moles, Age Spots) augmented with color jittering and cutaneous texture variations.',
      modelArchitecture: 'YOLO11 nano architecture featuring C3k2 blocks and SPPF (Spatial Pyramid Pooling Fast) optimized for fine-grained micro-feature spatial localization.',
      experimentalFindings: 'Trained for 100 epochs on 640x640 images. Achieved 70.83% precision across all condition categories with strong localization reliability for moles and acne lesions.'
    }
  },
  deepfake: {
    tag: 'Component 04',
    title: 'Deepfake Verification & Generalization',
    leadResearcher: 'Ruchira',
    shortDesc: 'Authentic vs. Manipulated face detection across within-dataset and cross-dataset conditions.',
    pipeline: [
      'Error Level Analysis (ELA)',
      'Landmark Forensic Masking',
      'ResNet-50 Convolutional Backbone',
      'Vision Transformer / Swin-Base'
    ],
    metrics: [
      { label: 'ResNet-50 Cross-Data', value: '92.55%', badge: 'Robust' },
      { label: 'Swin-Base Source Acc', value: '99.83%', badge: 'Benchmark' },
      { label: 'Swin-Base Cross Drop', value: '-18.88%', badge: 'Overfit Gap' },
      { label: 'Unseen Test Set', value: '2,000 Imgs', badge: 'Sri Lankan' }
    ],
    keyInsights: [
      'Swin Transformer achieved 99.83% on source test data but suffered a severe 18.88% collapse (to 80.95%) on 2,000 unseen real-world samples.',
      'ResNet-50 proved remarkably resilient, maintaining 92.55% cross-dataset generalization due to its convolutional inductive bias.',
      'Combining spatial CNN features with Error Level Analysis (ELA) prevents models from overfitting solely to compression artifacts.'
    ],
    inDepth: {
      datasetInfo: 'Trained on FaceForensics++ (Deepfakes, Face2Face, FaceSwap, NeuralTextures) and cross-evaluated against 2,000 completely unseen out-of-distribution Sri Lankan synthetic manipulations.',
      modelArchitecture: 'Comparative benchmark: ResNet-50 vs. ViT-B/16 vs. Swin-Base, coupled with dual-stream forensic frequency spectrum & ELA artifact maps.',
      experimentalFindings: 'Revealed the critical danger of benchmark complacency: Transformers memorize dataset-specific JPEG compression kernels, whereas ResNet-50 learns generalizable biological boundaries.'
    }
  }
};

function initResearchComponents() {
  const tabButtons = document.querySelectorAll('.comp-tab-btn');
  const contentCard = document.getElementById('comp-detail-card');

  function renderComp(id) {
    const comp = COMPONENTS_DATA[id] || COMPONENTS_DATA['fer'];

    tabButtons.forEach((btn) => {
      if (btn.dataset.comp === id) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    contentCard.innerHTML = `
      <div style="padding-bottom: 2rem; border-bottom: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 1rem; justify-content: space-between;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span class="badge badge-emerald">${comp.tag}</span>
              <span style="color: var(--text-faint);">•</span>
              <span style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-dim);">
                Lead Researcher: <strong style="color: #fff; font-weight: 500;">${comp.leadResearcher}</strong>
              </span>
            </div>
            <h3 style="font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 300; color: #fff;">${comp.title}</h3>
            <p style="font-size: 0.9rem; color: var(--text-dim); margin-top: 0.35rem; max-width: 44rem; font-weight: 300;">
              ${comp.shortDesc}
            </p>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; max-width: 24rem;">
            ${comp.pipeline.map(p => `
              <span class="badge" style="background: rgba(0,0,0,0.5); border-color: var(--border-subtle);">${p}</span>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="metrics-grid">
        ${comp.metrics.map(m => `
          <div class="metric-card">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 0.75rem; color: var(--text-dim);">${m.label}</span>
              ${m.badge ? `<span style="font-size: 0.65rem; font-family: var(--font-mono); padding: 0.15rem 0.45rem; border-radius: 0.25rem; background: rgba(255,255,255,0.08); color: var(--text-muted);">${m.badge}</span>` : ''}
            </div>
            <div class="metric-value">${m.value}</div>
          </div>
        `).join('')}
      </div>

      <div class="comp-insights-grid">
        <div style="padding: 1.5rem; border-radius: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
          <div style="font-size: 0.75rem; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: var(--emerald);">📈</span> Key Research Insights & Findings
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${comp.keyInsights.map((ki, i) => `
              <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                <div style="width: 1.25rem; height: 1.25rem; border-radius: 50%; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-family: var(--font-mono); color: var(--emerald); shrink: 0; margin-top: 0.15rem;">
                  ${i + 1}
                </div>
                <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.6; font-weight: 300;">${ki}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="padding: 1.5rem; border-radius: 1rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 1rem;">
          <div style="font-size: 0.75rem; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: var(--blue);">🔬</span> Experimental Methodology Details
          </div>

          <div>
            <span style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--text-faint); display: block; margin-bottom: 0.2rem;">Dataset & Benchmark Partition:</span>
            <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; font-weight: 300;">${comp.inDepth.datasetInfo}</p>
          </div>

          <div>
            <span style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--text-faint); display: block; margin-bottom: 0.2rem;">Model Architecture & Optimization:</span>
            <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; font-weight: 300;">${comp.inDepth.modelArchitecture}</p>
          </div>

          <div style="background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.2); padding: 0.75rem; border-radius: 0.75rem;">
            <span style="font-size: 0.7rem; font-family: var(--font-mono); color: #6ee7b7; display: block; margin-bottom: 0.2rem;">Empirical Takeaway:</span>
            <p style="font-size: 0.8rem; color: #a7f3d0; line-height: 1.5; font-weight: 300;">${comp.inDepth.experimentalFindings}</p>
          </div>
        </div>
      </div>
    `;
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      renderComp(btn.dataset.comp);
    });
  });

  // Default tab
  renderComp('fer');
}

/* ─────────────────────────────────────────────────────────────
   4. TECH STACK FILTER
   ───────────────────────────────────────────────────────────── */
function initTechStackFilter() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const techCards = document.querySelectorAll('.tech-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const cat = pill.dataset.category;

      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      techCards.forEach((card) => {
        if (cat === 'All' || card.dataset.category === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   5. DOCUMENTS MODAL PREVIEW
   ───────────────────────────────────────────────────────────── */
const DOCS_METADATA = {
  taf: {
    title: 'Topic Assessment Form (TAF)',
    subtitle: 'Official Research Topic Approval & Inception Milestone',
    fileSize: '413 KB',
    format: 'PDF',
    date: 'Semester 1 • Milestone 1',
    filePath: 'docs/taf.pdf',
    driveUrl: 'https://drive.google.com/file/d/1IuGWnAsykhD6w-9Fu44AJ5OXkoPjKet6/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1IuGWnAsykhD6w-9Fu44AJ5OXkoPjKet6/preview',
    abstract: 'Official Topic Assessment Form (TAF) submitted to the SLIIT Faculty of Computing. Establishes the formal research scope, problem justification for Sri Lankan facial demographic analysis, low-light illumination challenges, and supervisor alignment for undergraduate research.',
    topicsCovered: [
      'Research title & domain justification',
      'Sri Lankan cultural demographic problem formulation',
      'Multi-task facial analysis problem statement',
      'Faculty supervisor & co-supervisor formal alignment',
      'Technical feasibility & milestone timeline baseline'
    ]
  },
  proposalPresentation: {
    title: 'Research Project Proposal Presentation',
    subtitle: 'Proposal Defense Slides & Evaluation Architecture',
    fileSize: '2.1 MB',
    format: 'PDF',
    date: 'Semester 1 • Proposal Defense',
    filePath: 'docs/proposal-presentation.pdf',
    driveUrl: 'https://drive.google.com/file/d/1mGWLk7-gGMFgGTmZJkN52PUpsZfi_JPn/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1mGWLk7-gGMFgGTmZJkN52PUpsZfi_JPn/preview',
    abstract: 'Official Research Project Proposal presentation deck presented to the SLIIT academic examination panel, detailing the multi-task research methodology, demographic dataset gaps, low-light face enhancement, client-side demographics, condition detection, and deepfake verification.',
    topicsCovered: [
      'Core research problem & demographic bias in FER',
      'Low-light face enhancement pipeline (CLAHE + Gamma)',
      'Client-side edge demographic inference (Face-API.js)',
      'Localized facial condition detection (YOLO11n)',
      'Cross-dataset deepfake detection & generalization audit'
    ]
  },
  proposalDamidu: {
    title: 'Proposal Document — Damidu Dissanayake',
    subtitle: 'IT22541970 • Emotion Recognition & Low Light',
    fileSize: '1.14 MB',
    format: 'PDF',
    date: 'Semester 1 • Proposal Submission',
    filePath: 'docs/IT22541970_Damidu.pdf',
    driveUrl: 'https://drive.google.com/file/d/1BLbvTrISPrssQXHxydc_1HlEtarc7JCk/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1BLbvTrISPrssQXHxydc_1HlEtarc7JCk/preview',
    abstract: 'Research proposal addressing emotion recognition vulnerabilities under low-light illumination on Sri Lankan faces. Integrates SSD MobileNet V3, adaptive L-channel CLAHE, and a custom CNN architecture.',
    topicsCovered: [
      'Low-light luminance degradation in facial biometrics',
      'Adaptive CLAHE + parametric Gamma enhancement pipeline',
      '5-class Sri Lankan facial emotion classification',
      'Empirical benchmark methodology and evaluation metrics'
    ]
  },
  proposalGagana: {
    title: 'Proposal Document — Gagana Perera',
    subtitle: 'IT22254252 • Age & Gender Estimation',
    fileSize: '11.16 MB',
    format: 'PDF',
    date: 'Semester 1 • Proposal Submission',
    filePath: 'docs/IT22254252_Gagana.pdf',
    driveUrl: 'https://drive.google.com/file/d/1IgmpnJj8aHnALoRRuCxK-WSsFSzE7UfR/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1IgmpnJj8aHnALoRRuCxK-WSsFSzE7UfR/preview',
    abstract: 'Research proposal focusing on client-side, zero-cloud edge inference for age and gender estimation using Face-API.js and TensorFlow.js tailored for South Asian demographic features.',
    topicsCovered: [
      'Client-side privacy-preserving demographic inference',
      'Face-API.js & TensorFlow.js WebAssembly acceleration',
      'Cross-entropy loss analysis across Fitzpatrick Skin Types IV & V',
      'Real-time webcam inference benchmarking under 40ms'
    ]
  },
  proposalSanjana: {
    title: 'Proposal Document — Sanjana Deshan',
    subtitle: 'IT22278876 • Localized Condition Detection',
    fileSize: '2.14 MB',
    format: 'PDF',
    date: 'Semester 1 • Proposal Submission',
    filePath: 'docs/IT22278876_Sanjana.pdf',
    driveUrl: 'https://drive.google.com/file/d/1OJi84voT3KLS714hmv0ct7nGcxfDNr_7/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1OJi84voT3KLS714hmv0ct7nGcxfDNr_7/preview',
    abstract: 'Research proposal on fine-grained dermatological facial condition detection (Acne, Wrinkles, Moles, Age Spots) utilizing YOLO11n fine-tuned on localized Sri Lankan clinical imagery.',
    topicsCovered: [
      'Multi-label facial skin condition bounding-box localization',
      'YOLO11n fine-tuning and hyperparameter optimization',
      'Spatial CIoU loss and anchor box adjustment for micro-features',
      'Clinical validation and mAP@50 evaluation baseline'
    ]
  },
  proposalRuchira: {
    title: 'Proposal Document — Ruchira Gunawardhana',
    subtitle: 'IT22276728 • Deepfake Detection & Generalization',
    fileSize: '1.05 MB',
    format: 'PDF',
    date: 'Semester 1 • Proposal Submission',
    filePath: 'docs/IT22276728_Ruchira.pdf',
    driveUrl: 'https://drive.google.com/file/d/1xR4RMzxbxJVRvqOkCOcK_3TZgkhzGDHS/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1xR4RMzxbxJVRvqOkCOcK_3TZgkhzGDHS/preview',
    abstract: 'Research proposal auditing inductive bias vs transformer self-attention in deepfake detection. Evaluates ResNet-50 vs Swin Transformer across 2,000 unseen Sri Lankan deepfakes.',
    topicsCovered: [
      'Overfitting vulnerabilities in state-of-the-art vision transformers',
      'ResNet-50 convolutional inductive bias comparative audit',
      'Error Level Analysis (ELA) and frequency domain verification',
      'Unseen Sri Lankan demographic cross-dataset benchmark'
    ]
  },
  pp1: {
    title: 'Research Project Progress Presentation 1 (PP1)',
    subtitle: 'Progress Milestone 1 Evaluation & Defense Slides',
    fileSize: '1.63 MB',
    format: 'PDF',
    date: 'Semester 1 • Progress Review 1',
    filePath: 'docs/pp1-presentation.pdf',
    driveUrl: 'https://drive.google.com/file/d/1J3mx6PPruc_WPiP2LcsCN-PBfmfC4NeX/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1J3mx6PPruc_WPiP2LcsCN-PBfmfC4NeX/preview',
    abstract: 'First formal progress presentation (PP1) presented to the SLIIT examination panel. Details intermediate dataset curation, pipeline prototyping, initial CLAHE low-light equalization benchmarks, and preliminary edge runtime measurements.',
    topicsCovered: [
      'Preliminary dataset collection for Sri Lankan demographics',
      'MobileNet V3 backbone feature map extraction',
      'Face-API.js model quantization & browser memory profiling',
      'Initial YOLO11n annotation benchmarks for facial conditions'
    ]
  },
  pp2: {
    title: 'Research Project Progress Presentation 2 (PP2)',
    subtitle: 'Progress Milestone 2 Evaluation & Model Convergence',
    fileSize: '3.59 MB',
    format: 'PDF',
    date: 'Semester 2 • Progress Review 2',
    filePath: 'docs/pp2-presentation.pdf',
    driveUrl: 'https://drive.google.com/file/d/1ts5CHj_t86ZrmbO1hQb1Z5OnLG3W8M7Z/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1ts5CHj_t86ZrmbO1hQb1Z5OnLG3W8M7Z/preview',
    abstract: 'Second progress presentation (PP2) detailing model convergence curves, cross-dataset generalization evaluation, ResNet-50 vs Swin Transformer deepfake robustness audits, and integrated multi-task demonstration prototype.',
    topicsCovered: [
      'Model loss curves, confusion matrices, and convergence audits',
      'Extreme low-light stress test evaluations (<15 lux)',
      'Client-side edge demo latency (<38ms per frame)',
      'Panel feedback addressing algorithmic fairness & ethics'
    ]
  },
  paper: {
    title: 'IEEE Conference Research Paper',
    subtitle: 'A Multi-Task Evaluation of Emotion, Facial Conditions, and Deepfake Detection',
    fileSize: '366 KB',
    format: 'PDF',
    date: 'ICAC 2026 Conference Submission',
    filePath: 'docs/research-paper.pdf',
    driveUrl: 'https://drive.google.com/file/d/13KEmB_HbDrIKQwkLQgdQZP55jm9jFsVP/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/13KEmB_HbDrIKQwkLQgdQZP55jm9jFsVP/preview',
    abstract: 'Full academic research paper formatted for IEEE ICAC 2026. Formulates the multi-task evaluation framework, comparative demographic audits on South Asian faces, and empirical validation across low illumination, browser edge estimation, condition detection, and deepfake verification.',
    topicsCovered: [
      'Abstract & introduction to demographic representation bias',
      'Mathematical formulation of CLAHE + Gamma enhancement',
      'Client-side zero-cloud demographic estimation architecture',
      'ResNet-50 vs Swin-Base 2,000 Sri Lankan deepfake audit',
      'Full ablation study, confusion matrices, and future roadmap'
    ]
  }
};

function initDocumentsModal() {
  const modalOverlay = document.getElementById('doc-preview-modal');
  const modalTitle = document.getElementById('modal-doc-title');
  const modalMeta = document.getElementById('modal-doc-meta');
  const modalIframe = document.getElementById('modal-pdf-iframe');
  const modalAbstract = document.getElementById('modal-doc-abstract');
  const modalTopics = document.getElementById('modal-doc-topics');
  const modalDownloadBtns = document.querySelectorAll('.modal-download-btn');
  const modalDriveBtns = document.querySelectorAll('.modal-drive-btn');
  const closeBtns = document.querySelectorAll('.modal-close-trigger');
  const tabLocal = document.getElementById('tab-viewer-local');
  const tabDrive = document.getElementById('tab-viewer-drive');

  let currentDocKey = null;
  let activeViewerMode = 'local';

  function updateIframeSource() {
    const doc = DOCS_METADATA[currentDocKey];
    if (!doc) return;

    if (activeViewerMode === 'local') {
      // Local PDF rendered directly by browser's native engine
      modalIframe.src = `${doc.filePath}#view=FitH&toolbar=1`;
      if (tabLocal) tabLocal.classList.add('active');
      if (tabDrive) tabDrive.classList.remove('active');
    } else {
      // Google Drive cloud preview
      modalIframe.src = doc.previewUrl;
      if (tabLocal) tabLocal.classList.remove('active');
      if (tabDrive) tabDrive.classList.add('active');
    }
  }

  function openModal(docKey) {
    const doc = DOCS_METADATA[docKey];
    if (!doc) return;

    currentDocKey = docKey;
    activeViewerMode = 'local'; // Always default to instant, dependable local PDF

    modalTitle.textContent = doc.title;
    modalMeta.textContent = `${doc.format} • ${doc.fileSize} • ${doc.date}`;
    modalAbstract.textContent = doc.abstract || '';

    modalTopics.innerHTML = (doc.topicsCovered || []).map(t => `
      <div style="display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.6rem; border-radius: 0.6rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
        <span style="color: var(--emerald); font-weight: bold;">✓</span>
        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 300;">${t}</span>
      </div>
    `).join('');

    modalDownloadBtns.forEach(btn => {
      btn.href = doc.filePath;
    });

    modalDriveBtns.forEach(btn => {
      btn.href = doc.driveUrl;
    });

    const directPdfLink = document.getElementById('modal-direct-pdf-link');
    if (directPdfLink) {
      directPdfLink.href = doc.filePath;
    }

    updateIframeSource();

    modalOverlay.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    modalIframe.src = 'about:blank';
    currentDocKey = null;
  }

  if (tabLocal) {
    tabLocal.addEventListener('click', () => {
      activeViewerMode = 'local';
      updateIframeSource();
    });
  }

  if (tabDrive) {
    tabDrive.addEventListener('click', () => {
      activeViewerMode = 'drive';
      updateIframeSource();
    });
  }

  // Bind trigger buttons
  document.querySelectorAll('[data-preview-doc]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const mobileDrawer = document.getElementById('mobile-drawer');
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        mobileDrawer.classList.remove('active');
      }
      openModal(btn.dataset.previewDoc);
    });
  });

  // Close triggers
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Close on clicking backdrop outside window
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
}

/* ─────────────────────────────────────────────────────────────
   6. BIBTEX CITATION COPY
   ───────────────────────────────────────────────────────────── */
function initCitationCopy() {
  const copyBtn = document.getElementById('copy-bibtex-btn');
  const copyText = document.getElementById('copy-bibtex-text');
  const citationPre = document.getElementById('bibtex-code');

  if (copyBtn && citationPre) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(citationPre.textContent.trim()).then(() => {
        copyText.textContent = 'Copied BibTeX!';
        copyBtn.style.color = 'var(--emerald)';
        setTimeout(() => {
          copyText.textContent = 'Copy BibTeX';
          copyBtn.style.color = '';
        }, 2500);
      });
    });
  }
}

/* ─────────────────────────────────────────────────────────────
   7. SCROLL TO TOP
   ───────────────────────────────────────────────────────────── */
function initScrollToTop() {
  const topBtn = document.getElementById('back-to-top-btn');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
