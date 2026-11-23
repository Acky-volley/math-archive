/**
 * MathArchive - 数学問題・模範解答アーカイブ
 * Application Logic
 */

// ==========================================================
// 定数 & 初期データ
// ==========================================================
const STORAGE_KEY = 'math_archive_questions_v1';
const STATUS_STORAGE_KEY = 'math_archive_status_v1';
const THEME_STORAGE_KEY = 'math_archive_theme_v1';
const GITHUB_CONFIG_KEY = 'math_archive_github_config_v1';

// file:// プロトコル等で fetch が制限された場合のフォールバック用サンプルデータ
const FALLBACK_QUESTIONS = [
  {
    "id": "q-1794702890129",
    "title": "変数係数の2階線形微分方程式：斉次解＋特殊解",
    "category": "微分積分学",
    "difficulty": 4,
    "tags": ["微分方程式"],
    "problem": "次の微分方程式の一般解を求めよ。\n\n$(1)\\space y'' - \\dfrac{2x}{x^2-1}y' + \\dfrac{2}{x^2-1}y = x^2-1$\n\n$(2)\\space xy''- (x+1)y' + y = x^2$",
    "hint": "R16：3次以上の方程式の解は、まず自明な解を考え、次に有力候補を代入せよR34：何を置換するかの定石をストックせよ\nR117：$f(x)g(x)、f(x)/g(x)、{f(x)}ⁿ$ の微分はできるようにすべし",
    "solution": "(1) 与えられた微分方程式を①とする。まず、対応する同次微分方程式$$y'' - \\dfrac{2x}{x^2-1}y' + \\dfrac{2}{x^2-1}y = 0 \\quad \\cdots \\text{②}$$を考える。$y = x$ を②の左辺に代入すると、$y' = 1, y'' = 0$ より$$0 - \\dfrac{2x}{x^2-1}\\cdot 1 + \\dfrac{2}{x^2-1}\\cdot x = 0$$となり、$y = x$ は②の解である。そこで、$y = ux$（$u$ は $x$ の関数）とおくと、$y' = u'x + u, \\ y'' = u''x + 2u'$ であるから、これらを①に代入して整理すると、$$(u''x + 2u') - \\dfrac{2x}{x^2-1}(u'x + u) + \\dfrac{2ux}{x^2-1} = x^2-1$$$$x u'' + \\left(2 - \\dfrac{2x^2}{x^2-1}\\right)u' = x^2-1$$$$x u'' - \\dfrac{2}{x^2-1}u' = x^2-1$$ここで $u' = p$ とおくと、$u'' = p'$ より、$$x p' - \\dfrac{2}{x^2-1}p = x^2-1 \\quad \\cdots \\text{③}$$まず、同次方程式 $x p' - \\dfrac{2}{x^2-1}p = 0$ を解く。変数分離すると、$$\\dfrac{1}{p}dp = \\dfrac{2}{x(x^2-1)}dx = \\left(-\\dfrac{2}{x} + \\dfrac{1}{x-1} + \\dfrac{1}{x+1}\\right)dx$$両辺を積分して整理すると、$$\\log\\vert{}p\\vert{} = -2\\log\\vert{}x\\vert{} + \\log\\vert{}x-1\\vert{} + \\log\\vert{}x+1\\vert{} + C = \\log\\left\\vert{}\\dfrac{x^2-1}{x^2}\\right\\vert{} + C$$よって、$p = C_1 \\dfrac{x^2-1}{x^2}$（$C_1$ は任意定数）となる。定数変化法により、$p = C(x)\\dfrac{x^2-1}{x^2}$ とおいて③に代入すると、$$x \\cdot C'(x)\\dfrac{x^2-1}{x^2} = x^2-1 \\implies C'(x) = x$$両辺を積分すると、$C(x) = \\dfrac{1}{2}x^2 + C_1$ となる。よって $u' = p$ は、$$u' = \\left(\\dfrac{1}{2}x^2 + C_1\\right)\\dfrac{x^2-1}{x^2} = \\dfrac{1}{2}(x^2 - 1) + C_1\\left(1 - \\dfrac{1}{x^2}\\right)$$両辺を $x$ で積分すると、$$u = \\dfrac{1}{6}x^3 - \\dfrac{1}{2}x + C_1\\left(x + \\dfrac{1}{x}\\right) + C_2 \\quad (C_1, C_2 \\text{ は任意定数})$$したがって、求める一般解は $y = ux$ より、$$\\boldsymbol{y = C_1(x^2 + 1) + C_2 x + \\dfrac{1}{6}x^4 - \\dfrac{1}{2}x^2} \\quad \\boldsymbol{(C_1, C_2 \\text{ は任意定数})}$$\n\n(2)与えられた微分方程式の両辺を $x$ で割り、①とする。\n$$y'' - \\dfrac{x+1}{x}y' + \\dfrac{1}{x}y = x \\quad \\cdots \\text{①}$$まず、対応する同次微分方程式$$y'' - \\dfrac{x+1}{x}y' + \\dfrac{1}{x}y = 0 \\quad \\cdots \\text{②}$$を考える。$y = e^x$ を②の左辺に代入すると、$y' = e^x, y'' = e^x$ より$$e^x - \\dfrac{x+1}{x}e^x + \\dfrac{1}{x}e^x = \\left(1 - \\dfrac{x+1}{x} + \\dfrac{1}{x}\\right)e^x = 0$$となり、$y = e^x$ は②の解である。そこで、$y = u e^x$（$u$ は $x$ の関数）とおくと、$$y' = (u' + u)e^x, \\quad y'' = (u'' + 2u' + u)e^x$$これらを①に代入して整理すると、\n$$\\{(u''+2u'+u)-\\dfrac{x+1}{x}(u'+u)+\\dfrac{1}{x}u\\}e^x=x$$\n$$\\{u''+\\left(2-\\dfrac{x+1}{x}\\right)u'\\}e^x=x$$\n$$u'' + \\dfrac{x-1}{x}u' = x e^{-x}$$\nここで $u' = p$ とおくと、$u'' = p'$ より、$$p' + \\left(1 - \\dfrac{1}{x}\\right)p = x e^{-x} \\quad \\cdots \\text{③}$$まず、同次方程式 $p' + \\left(1 - \\dfrac{1}{x}\\right)p = 0$ を解く。変数分離すると、$$\\dfrac{1}{p}dp = \\left(\\dfrac{1}{x} - 1\\right)dx$$両辺を積分して整理すると、$\\log\\vert{}p\\vert{} = \\log\\vert{}x\\vert{} - x + C$ より、$p = C_1 x e^{-x}$（$C_1$ は任意定数）となる。定数変化法により、$p = C(x) x e^{-x}$ とおいて③に代入すると、$$C'(x) x e^{-x} = x e^{-x} \\implies C'(x) = 1$$両辺を積分すると、$C(x) = x + C_1$ となる。よって $u' = p$ は、$$u' = (x + C_1)x e^{-x} = (x^2 + C_1 x)e^{-x}$$両辺を $x$ で積分する。部分積分法を用いると、$$\\int x^2 e^{-x} dx = -(x^2 + 2x + 2)e^{-x}, \\quad \\int x e^{-x} dx = -(x + 1)e^{-x}$$であるから、$$u = -(x^2 + 2x + 2)e^{-x} - C_1(x + 1)e^{-x} + C_2 \\quad (C_1, C_2 \\text{ は任意定数})$$ここで $-C_1$ を改めて $C_1$ とおき直すと、求める一般解は $y = u e^x$ より、$$\\boldsymbol{y = C_1(x + 1) + C_2 e^x - x^2 - 2x - 2} \\quad \\boldsymbol{(C_1, C_2 \\text{ は任意定数})}$$",
    "alternative": "",
    "createdAt": "2026-11-15T00:34:50.128Z",
    "updatedAt": "2026-11-15T00:34:50.128Z"
  },
  {
    "id": "sample-1",
    "title": "定積分と区分求積法の応用",
    "category": "数学III・C",
    "difficulty": 3,
    "tags": ["微積分", "極限", "区分求積法", "頻出"],
    "problem": "次の極限値を求めよ。\n\n$$\\lim_{n \\to \\infty} \\sum_{k=1}^{n} \\frac{n}{n^2 + k^2}$$",
    "hint": "式全体を $\\frac{1}{n} f\\left(\\frac{k}{n}\\right)$ の形に変形し、区分求積法の公式\n$$\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{k=1}^{n} f\\left(\\frac{k}{n}\\right) = \\int_{0}^{1} f(x) dx$$\nを利用することを考えましょう。",
    "solution": "### 【解答】\n\n与えられた極限の一般項の分母・分子を $n^2$ で割ると、\n\n$$\\frac{n}{n^2 + k^2} = \\frac{1}{n} \\cdot \\frac{1}{1 + \\left(\\frac{k}{n}\\right)^2}$$\n\nと変形できる。\n\nよって、求める極限は次のように表される：\n\n$$\\lim_{n \\to \\infty} \\sum_{k=1}^{n} \\frac{n}{n^2 + k^2} = \\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{k=1}^{n} \\frac{1}{1 + \\left(\\frac{k}{n}\\right)^2}$$\n\n区分求積法の公式より、この極限は定積分に帰着される：\n\n$$= \\int_{0}^{1} \\frac{1}{1 + x^2} dx$$\n\nここで、$x = \\tan \\theta$ と置換すると、$dx = \\frac{1}{\\cos^2 \\theta} d\\theta$\n\n積分区間は $x: 0 \\to 1$ のとき $\\theta: 0 \\to \\frac{\\pi}{4}$ となるので、\n\n$$\\int_{0}^{1} \\frac{1}{1 + x^2} dx = \\int_{0}^{\\frac{\\pi}{4}} 1 \\, d\\theta = \\left[ \\theta \\right]_{0}^{\\frac{\\pi}{4}} = \\frac{\\pi}{4}$$\n\n**答:** $\\displaystyle \\frac{\\pi}{4}$",
    "alternative": "#### 【別解・ポイント】\n- $\\int \\frac{1}{1+x^2} dx = \\arctan(x) + C$ を既知として使ってよい場合、\n  $$[\\arctan(x)]_0^1 = \\arctan(1) - \\arctan(0) = \\frac{\\pi}{4}$$\n  と直ちに計算できます。",
    "createdAt": "2026-11-14T09:00:00.000Z",
    "updatedAt": "2026-11-14T09:00:00.000Z"
  },
  {
    "id": "sample-2",
    "title": "放物線と接線で囲まれる面積（1/12公式の証明と利用）",
    "category": "数学II・B",
    "difficulty": 2,
    "tags": ["微分積分", "面積", "1/12公式"],
    "problem": "放物線 $C: y = x^2$ と、その上の2点 $P(-1, 1)$, $Q(2, 4)$ における接線 $\\ell_1, \\ell_2$ を考える。\n\n1. 接線 $\\ell_1, \\ell_2$ の方程式およびその交点の座標を求めよ。\n2. 放物線 $C$ と2本の接線 $\\ell_1, \\ell_2$ で囲まれた図形の面積 $S$ を求めよ。",
    "hint": "2本の接線の交点の $x$ 座標は、2つの接点の $x$ 座標の中点になります。\n面積の計算では $(x - \\alpha)^2$ の積分形を活用すると計算が格段に楽になります。",
    "solution": "### 【解答】\n\n$y = x^2$ より $y' = 2x$ である。\n\n#### (1) 接線の方程式と交点\n- $\\ell_1: y = -2x - 1$\n- $\\ell_2: y = 4x - 4$\n\n連立すると交点座標は $\\displaystyle \\left( \\frac{1}{2}, -2 \\right)$ である。\n\n```graph\ntitle: 放物線 C: y = x^2 と2接線 l₁, l₂ で囲まれる面積 S\ndomain: [-2.2, 2.8]\nrange: [-3, 5]\nshade: x^2, -2x - 1 | from: -1 | to: 0.5 | color: #3b82f6 | label: 左側領域 [-1, 1/2]\nshade: x^2, 4x - 4 | from: 0.5 | to: 2 | color: #3b82f6 | label: 右側領域 [1/2, 2]\ny = x^2 | label: C: y = x^2 | color: #2563eb\ny = -2x - 1 | label: l₁: y = -2x - 1 | color: #10b981\ny = 4x - 4 | label: l₂: y = 4x - 4 | color: #f59e0b\npoint: (-1, 1) | label: P(-1, 1) | color: #10b981 | guide\npoint: (2, 4) | label: Q(2, 4) | color: #f59e0b | guide\npoint: (1/2, -2) | label: 交点(1/2, -2) | color: #ef4444 | guide\n```\n\n#### (2) 囲まれた面積 $S$\n$$S = \\int_{-1}^{\\frac{1}{2}} (x + 1)^2 dx + \\int_{\\frac{1}{2}}^{2} (x - 2)^2 dx = \\frac{9}{8} + \\frac{9}{8} = \\frac{9}{4}$$\n\n**答:** (1) 交点 $\\left(\\frac{1}{2}, -2\\right)$　(2) $S = \\displaystyle \\frac{9}{4}$",
    "alternative": "#### 【1/12公式による検算】\n$$S = \\frac{|a|}{12} (\\beta - \\alpha)^3 = \\frac{1}{12} (2 - (-1))^3 = \\frac{27}{12} = \\frac{9}{4}$$",
    "createdAt": "2026-11-14T09:15:00.000Z",
    "updatedAt": "2026-11-23T00:30:00.000Z"
  },
  {
    "id": "sample-3",
    "title": "2次正方行列の固有値と対角化",
    "category": "線形代数",
    "difficulty": 3,
    "tags": ["線形代数", "固有値", "対角化", "大学数学"],
    "problem": "次の行列 $A$ の固有値と固有ベクトルを求め、対角化可能である場合は対角化せよ。\n\n$$A = \\begin{pmatrix} 4 & 2 \\\\ 1 & 3 \\end{pmatrix}$$",
    "hint": "特性方程式 $\\det(A - \\lambda I) = 0$ を解いて固有値 $\\lambda$ を求めます。",
    "solution": "### 【解答】\n\n特性方程式 $\\det(A - \\lambda I) = 0$ より、\n$$(\\lambda - 2)(\\lambda - 5) = 0 \\implies \\lambda = 2, 5$$\n\n- $\\lambda = 2$ の固有ベクトル: $\\mathbf{v}_1 = c_1 \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$\n- $\\lambda = 5$ の固有ベクトル: $\\mathbf{v}_2 = c_2 \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$\n\n変換行列 $P = \\begin{pmatrix} 1 & 2 \\\\ -1 & 1 \\end{pmatrix}$ とおくと、\n$$P^{-1}AP = \\begin{pmatrix} 2 & 0 \\\\ 0 & 5 \\end{pmatrix}$$\n\n**答:** 固有値 $\\lambda = 2, 5$, 対角化 $P^{-1}AP = \\begin{pmatrix} 2 & 0 \\\\ 0 & 5 \\end{pmatrix}$",
    "alternative": "",
    "createdAt": "2026-11-14T09:30:00.000Z",
    "updatedAt": "2026-11-14T09:30:00.000Z"
  }
];

// ==========================================================
// 状態管理 (App State)
// ==========================================================
class MathArchiveApp {
  constructor() {
    this.questions = [];
    this.statusMap = {}; // { [questionId]: 'unlearned' | 'review' | 'mastered' }
    this.currentMode = 'view'; // 'view' (一覧) | 'detail' (単問閲覧) | 'admin' (管理)
    this.currentQuestionId = null;
    this.activeTag = null;
    this.editingId = null;
    this.debounceTimers = {};

    this.init();
  }

  async init() {
    this.initTheme();
    this.loadGitHubConfig();
    await this.loadData();
    this.bindEvents();
    this.renderMathPalette();
    this.render();
    this.handleHashChange();
  }

  renderMathPalette() {
    const palette = document.querySelector('.palette-buttons');
    if (palette && window.renderMathInElement) {
      renderMathInElement(palette, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  }

  // --------------------------------------------------------
  // テーマ初期化 (ダーク / ライト)
  // --------------------------------------------------------
  initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
      document.getElementById('theme-icon')?.setAttribute('data-lucide', 'sun');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
      document.getElementById('theme-icon')?.setAttribute('data-lucide', 'moon');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    this.refreshIcons();
    document.querySelectorAll('.math-graph-widget').forEach(el => {
      if (typeof el._redrawGraph === 'function') el._redrawGraph();
    });
  }

  toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    this.setTheme(isDark ? 'light' : 'dark');
  }

  // --------------------------------------------------------
  // データ読み込み & 保存
  // --------------------------------------------------------
  async loadData() {
    // 1. 理解度ステータスをロード
    try {
      const storedStatus = localStorage.getItem(STATUS_STORAGE_KEY);
      this.statusMap = storedStatus ? JSON.parse(storedStatus) : {};
    } catch (e) {
      this.statusMap = {};
    }

    // 2. ローカルデータを取得
    let localQuestions = null;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localQuestions = parsed;
        }
      } catch (e) {
        console.warn('LocalStorage data parse failed:', e);
      }
    }

    // 3. questions.json から最新データを取得してマージを試みる（GitHub Pages公開時に他端末の変更を自動反映）
    try {
      const res = await fetch('questions.json?t=' + Date.now());
      if (res.ok) {
        const remoteData = await res.json();
        if (Array.isArray(remoteData) && remoteData.length > 0) {
          if (!localQuestions) {
            this.questions = remoteData;
          } else {
            // リモートとローカルをIDベースで新しい方を優先マージ
            const map = new Map();
            localQuestions.forEach(q => map.set(q.id, q));
            remoteData.forEach(rq => {
              const existing = map.get(rq.id);
              if (!existing || new Date(rq.updatedAt || 0) >= new Date(existing.updatedAt || 0)) {
                map.set(rq.id, rq);
              }
            });
            this.questions = Array.from(map.values());
          }
          this.saveQuestions(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Fetch questions.json skipped or failed:', e);
    }

    if (localQuestions) {
      this.questions = localQuestions;
      return;
    }

    // フォールバック
    this.questions = [...FALLBACK_QUESTIONS];
    this.saveQuestions(false);
  }

  saveQuestions(triggerAutoSync = false) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.questions));
    if (triggerAutoSync && this.githubConfig?.autoSync && this.githubConfig?.repo && this.githubConfig?.token) {
      this.pushToGitHub(true);
    }
  }

  saveStatus() {
    localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(this.statusMap));
  }

  // --------------------------------------------------------
  // イベント登録
  // --------------------------------------------------------
  bindEvents() {
    // ロゴクリックで常に問題一覧へ戻る
    document.querySelector('.logo-area')?.addEventListener('click', () => {
      this.navigateTo('view');
    });

    // URLハッシュ変更（ブラウザの戻る・進む対応）
    window.addEventListener('hashchange', () => this.handleHashChange());

    // テーマ切り替え
    document.getElementById('btn-theme-toggle').addEventListener('click', () => this.toggleTheme());

    // ビュー / 管理モード切り替え
    document.getElementById('btn-toggle-view').addEventListener('click', () => {
      this.toggleMode();
    });

    // 検索 & フィルター
    const searchInput = document.getElementById('global-search');
    const clearBtn = document.getElementById('clear-search');
    searchInput.addEventListener('input', (e) => {
      clearBtn.style.display = e.target.value ? 'flex' : 'none';
      if (this.currentMode !== 'view') {
        this.setMode('view', false);
      }
      this.renderQuestionList();
    });
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      this.renderQuestionList();
      searchInput.focus();
    });

    document.getElementById('filter-category').addEventListener('change', () => this.renderQuestionList());
    document.getElementById('filter-difficulty').addEventListener('change', () => this.renderQuestionList());
    document.getElementById('filter-status').addEventListener('change', () => this.renderQuestionList());
    document.getElementById('sort-order').addEventListener('change', () => this.renderQuestionList());

    // 単問閲覧ページ内のボタン
    document.getElementById('btn-back-to-list')?.addEventListener('click', () => this.navigateTo('view'));
    document.getElementById('btn-back-to-list-bottom')?.addEventListener('click', () => this.navigateTo('view'));
    document.getElementById('btn-detail-random')?.addEventListener('click', () => this.openRandomQuestionPage());
    document.getElementById('btn-detail-edit')?.addEventListener('click', () => {
      if (this.currentQuestionId) {
        this.editQuestion(this.currentQuestionId);
      }
    });

    // ランダム出題（単問閲覧ページへ直接ジャンプ）
    document.getElementById('btn-random').addEventListener('click', () => this.openRandomQuestionPage());
    document.getElementById('btn-close-modal')?.addEventListener('click', () => this.closeRandomModal());
    document.getElementById('btn-close-modal-bottom')?.addEventListener('click', () => this.closeRandomModal());
    document.getElementById('btn-next-random')?.addEventListener('click', () => this.showRandomQuestion());
    document.querySelector('.modal-backdrop')?.addEventListener('click', () => this.closeRandomModal());

    // 空状態からの追加ボタン
    document.getElementById('btn-empty-add').addEventListener('click', () => {
      this.navigateTo('admin');
      this.setAdminTab('editor');
    });

    // 管理モードのタブ切り替え
    document.querySelectorAll('.admin-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = tab.getAttribute('data-tab');
        this.setAdminTab(tabName);
      });
    });

    // 数式ツールバーボタン
    document.querySelectorAll('.btn-math').forEach(btn => {
      btn.addEventListener('click', () => {
        const insertText = btn.getAttribute('data-insert');
        this.insertMathSnippet(insertText);
      });
    });

    // エディタのリアルタイムプレビュー
    this.bindEditorPreview('form-problem', 'preview-problem');
    this.bindEditorPreview('form-hint', 'preview-hint');
    this.bindEditorPreview('form-solution', 'preview-solution');
    this.bindEditorPreview('form-alternative', 'preview-alternative');

    // フォーム送信
    document.getElementById('question-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // フォームキャンセル
    document.getElementById('btn-cancel-edit').addEventListener('click', () => {
      const targetId = this.editingId;
      this.resetForm();
      if (targetId) {
        this.openQuestionDetail(targetId);
      } else {
        this.navigateTo('view');
      }
    });

    // データ管理ボタン群
    document.getElementById('btn-save-gh-config')?.addEventListener('click', () => this.saveGitHubConfig());
    document.getElementById('btn-push-gh')?.addEventListener('click', () => this.pushToGitHub(false));
    document.getElementById('btn-pull-gh')?.addEventListener('click', () => this.pullFromGitHub());
    document.getElementById('btn-export-github-json').addEventListener('click', () => this.exportGitHubJson());
    document.getElementById('btn-backup-export').addEventListener('click', () => this.exportBackup());
    document.getElementById('file-import-json').addEventListener('change', (e) => this.importBackup(e));
    document.getElementById('btn-reload-samples').addEventListener('click', () => this.reloadSamples());
    document.getElementById('btn-reset-all').addEventListener('click', () => this.resetAllData());
  }

  // --------------------------------------------------------
  // 画面遷移 & URLハッシュルーティング (一覧 / 単問閲覧 / 管理)
  // --------------------------------------------------------
  handleHashChange() {
    const hash = window.location.hash || '';
    if (hash.startsWith('#question/')) {
      const qId = decodeURIComponent(hash.replace('#question/', ''));
      this.openQuestionDetail(qId, false);
    } else if (hash === '#admin') {
      this.setMode('admin', false);
    } else {
      this.setMode('view', false);
    }
  }

  navigateTo(mode, questionId = null) {
    if (mode === 'detail' && questionId) {
      const targetHash = `#question/${encodeURIComponent(questionId)}`;
      if (window.location.hash === targetHash) {
        this.openQuestionDetail(questionId, false);
      } else {
        window.location.hash = targetHash;
      }
    } else if (mode === 'admin') {
      if (window.location.hash === '#admin') {
        this.setMode('admin', false);
      } else {
        window.location.hash = '#admin';
      }
    } else {
      if (window.location.hash) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }
      this.setMode('view', false);
    }
  }

  setMode(mode, updateHash = true) {
    if (updateHash) {
      this.navigateTo(mode, this.currentQuestionId);
      return;
    }

    this.currentMode = mode;
    const viewSection = document.getElementById('view-mode');
    const detailSection = document.getElementById('detail-mode');
    const adminSection = document.getElementById('admin-mode');
    const modeIcon = document.getElementById('mode-icon');
    const modeText = document.getElementById('mode-text');

    viewSection?.classList.remove('active');
    detailSection?.classList.remove('active');
    adminSection?.classList.remove('active');

    if (mode === 'admin') {
      adminSection?.classList.add('active');
      modeIcon?.setAttribute('data-lucide', 'arrow-left');
      if (modeText) modeText.textContent = '問題一覧に戻る';
      this.renderAdminTable();
      this.updateAdminCount();
    } else if (mode === 'detail') {
      detailSection?.classList.add('active');
      modeIcon?.setAttribute('data-lucide', 'plus-circle');
      if (modeText) modeText.textContent = '問題を追加・管理';
    } else {
      viewSection?.classList.add('active');
      modeIcon?.setAttribute('data-lucide', 'plus-circle');
      if (modeText) modeText.textContent = '問題を追加・管理';
      this.render();
    }
    this.refreshIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMode() {
    if (this.currentMode === 'admin') {
      this.navigateTo('view');
    } else {
      this.navigateTo('admin');
    }
  }

  setAdminTab(tabName) {
    document.querySelectorAll('.admin-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabName);
    });
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === `tab-${tabName}`);
    });
    if (tabName === 'manage-list') {
      this.renderAdminTable();
    }
    this.refreshIcons();
  }

  // --------------------------------------------------------
  // 数式・Markdown レンダリング補助 (連立方程式・複数行数式完全対応)
  // --------------------------------------------------------
  normalizeLatex(latex, displayMode = false) {
    if (!latex) return '';
    let s = latex.trim();

    // 1. 日本語IME由来の全角バックスラッシュや矢印記号を正規化 (増減表対応)
    s = s.replace(/＼/g, '\\')
         .replace(/↗/g, '\\nearrow ')
         .replace(/↘/g, '\\searrow ')
         .replace(/↖/g, '\\nwarrow ')
         .replace(/↙/g, '\\swarrow ')
         .replace(/⤴/g, '\\hookrightarrow ')
         .replace(/⤵/g, '\\curvearrowright ');

    // 2. \left{ や \right} のバックスラッシュ抜けを自動補正 (\left\{, \right\})
    s = s.replace(/\\left\s*\{/g, '\\left\\{');
    s = s.replace(/\\right\s*\}/g, '\\right\\}');

    // 3. \begin{tabular}{...} ... \end{tabular} を KaTeX 対応の \begin{array}{...} に変換 (増減表対応)
    s = s.replace(/\\begin\{tabular\}(\{[^{}]*\})?([\s\S]*?)\\end\{tabular\}/g, (_, colSpec, body) => {
      const cleanedBody = body.replace(/(?<!\\)\$([^$]+?)(?<!\\)\$/g, '$1');
      return `\\begin{array}${colSpec || '{cccccccc}'}${cleanedBody}\\end{array}`;
    });

    // 4. \systeme{eq1, eq2, ...} 記法を \begin{cases} ... \end{cases} に変換
    s = s.replace(/\\systeme(?:\[[^\]]*\])?\{([^{}]+)\}/g, (_, body) => {
      const rows = body.split(',').map(r => r.trim()).filter(Boolean).join(' \\\\ ');
      return `\\begin{cases} ${rows} \\end{cases}`;
    });

    // 5. \begin{numcases}{prefix} ... \end{numcases} / subnumcases 対応
    s = s.replace(/\\begin\{(sub)?numcases\}\{([^{}]*)\}([\s\S]*?)\\end\{(sub)?numcases\}/g, (_, _s1, prefix, body) => {
      return `${prefix}\\begin{dcases}${body}\\end{dcases}`;
    });

    // 6. \begin{empheq}[left=...]{align} ... \end{empheq} 対応
    s = s.replace(/\\begin\{empheq\}(?:\[[^\]]*\])?\{[a-zA-Z*]+\}([\s\S]*?)\\end\{empheq\}/g, (_, body) => {
      return `\\left\\{\\begin{aligned}${body}\\end{aligned}\\right.`;
    });

    // 7. \begin{eqnarray} / \begin{eqnarray*} を \begin{aligned} に変換 (KaTeX非対応環境の吸収)
    s = s.replace(/\\begin\{eqnarray\*?\}([\s\S]*?)\\end\{eqnarray\*?\}/g, (_, body) => {
      const converted = body.replace(/&\s*([^&\\\n]+?)\s*&/g, '&$1');
      return `\\begin{aligned}${converted}\\end{aligned}`;
    });

    // 8. \begin{equation} / \begin{equation*} を剥がす
    s = s.replace(/\\begin\{equation\*?\}([\s\S]*?)\\end\{equation\*?\}/g, '$1');

    // 9. \begin{array} の直後に列指定 {l} 等が省略されている場合は {cccccccc} を補完
    s = s.replace(/\\begin\{array\}(?!\s*\{)/g, '\\begin{array}{cccccccc}');

    // 10. インラインモードまたは \left 内部での align / gather 環境を aligned / gathered に変換
    if (!displayMode || /\\left\b/.test(s)) {
      s = s.replace(/\\begin\{align\*?\}/g, '\\begin{aligned}')
           .replace(/\\end\{align\*?\}/g, '\\end{aligned}')
           .replace(/\\begin\{gather\*?\}/g, '\\begin{gathered}')
           .replace(/\\end\{gather\*?\}/g, '\\end{gathered}');
    }

    // 11. 複数行環境内で、行末の単一「\」(改行前のバックスラッシュ1個ミス) を「\\」に補正
    s = s.replace(/(?<!\\)\\[ \t]*\n/g, '\\\\\n');

    // 12. cases / dcases / rcases / array / aligned / gathered 等で改行のみで「\\」が省略されている場合の自動補完
    const fixMissingLineBreaks = (input, envPattern) => {
      const regex = new RegExp(`\\\\begin\\{(${envPattern})\\}(\\{[^{}]*\\})?([\\s\\S]*?)\\\\end\\{\\1\\}`, 'g');
      return input.replace(regex, (match, env, colSpec, body) => {
        if (/\\begin\{/.test(body)) return match;
        const lines = body.split('\n');
        const nonEmptyIndices = [];
        lines.forEach((line, idx) => {
          if (line.trim().length > 0) nonEmptyIndices.push(idx);
        });
        if (nonEmptyIndices.length >= 2) {
          for (let i = 0; i < nonEmptyIndices.length - 1; i++) {
            const lineIdx = nonEmptyIndices[i];
            const trimmed = lines[lineIdx].trim();
            // すでに \\ や \\[2pt] や \cr や \hline / \hdashline / \cline で終わっている場合はスキップ
            if (!/(\\\\(?:\s*\[[^\]]*\])?|\\cr|\\hline|\\hdashline|\\cline\{[^{}]*\})\s*$/.test(trimmed)) {
              lines[lineIdx] = lines[lineIdx].replace(/\s*$/, ' \\\\');
            }
          }
        }
        return `\\begin{${env}}${colSpec || ''}${lines.join('\n')}\\end{${env}}`;
      });
    };
    s = fixMissingLineBreaks(s, 'cases|dcases|rcases|array');
    s = fixMissingLineBreaks(s, 'aligned|gathered|align\\*?');

    // 13. 増減表など \hline を含む \begin{array} の行間を見やすく自動調整 (\arraystretch)
    if (/\\begin\{array\}/.test(s) && /\\hline/.test(s) && !/\\arraystretch/.test(s)) {
      s = `\\def\\arraystretch{1.4}${s}`;
    }

    // 14. cases / aligned / array 等やインライン数式内の \tag{...} をエラーにならない表記に変換
    if (!displayMode || /\\begin\{(cases|dcases|rcases|aligned|gathered|array|pmatrix|bmatrix|matrix)\}/.test(s)) {
      s = s.replace(/\\tag\*?\{([^{}]*)\}/g, (_, label) => {
        const clean = label.trim();
        if (/^[①-⑳()]/.test(clean)) {
          return `\\quad \\text{${clean}}`;
        }
        return `\\quad \\text{(${clean})}`;
      });
    }

    return s;
  }

  renderMarkdownAndKaTeX(text, targetEl) {
    if (!text || !text.trim()) {
      targetEl.innerHTML = '';
      return;
    }

    let processed = text.replace(/\r\n?/g, '\n');

    // 0. 関数グラフ描画ブロック (```graph ... ``` または ```plot ... ```) を抽出
    const graphTokens = [];
    processed = processed.replace(/```(?:graph|plot)[ \t]*\n([\s\S]*?)```/gi, (_, spec) => {
      const id = graphTokens.length;
      graphTokens.push(spec);
      return `\n\n%%GRAPHTOKEN${id}%%\n\n`;
    });

    // 1. コードブロック (`...`, ```...```) を一時退避
    const codeTokens = [];
    const addCodeToken = (code) => {
      const id = codeTokens.length;
      codeTokens.push(code);
      return `%%CODETOKEN${id}%%`;
    };
    processed = processed.replace(/```[\s\S]*?```/g, (m) => addCodeToken(m));
    processed = processed.replace(/`[^`\n]+`/g, (m) => addCodeToken(m));

    // 2. Marked が `\\` や `\{` や `_` や改行を破壊する前に数式ブロックを抽出して保護
    const mathTokens = [];
    const addMathToken = (math, display) => {
      const id = mathTokens.length;
      mathTokens.push({ math, display });
      return `%%MATHTOKEN${id}%%`;
    };

    // (a) $$ ... $$ (別行数式)
    processed = processed.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => addMathToken(math, true));

    // (b) \[ ... \] (別行数式)
    processed = processed.replace(/\\\[([\s\S]+?)\\\]/g, (_, math) => addMathToken(math, true));

    // (c) \( ... \) (インライン数式)
    processed = processed.replace(/\\\(([\s\S]+?)\\\)/g, (_, math) => addMathToken(math, false));

    // (d) $ ... $ (インライン・複数行数式)
    processed = processed.replace(/(?<!\\)\$(?!\$)((?:\\[\s\S]|[^$\\])+?)\$/g, (_, math) => addMathToken(math, false));

    // (e) $ や $$ で囲まれていない裸の \left\{ ... \right. (連立方程式など)
    processed = processed.replace(/\\left\s*(?:\\\{|\{)[\s\S]*?\\right\s*(?:\.|\\\}|\})/g, (m) => addMathToken(m, true));

    // (f) $ や $$ で囲まれていない裸の LaTeX 環境 (\begin{cases}...\end{cases}, \begin{array}...\end{array}, \begin{tabular}...\end{tabular} 等)
    const bareEnvRegex = /\\begin\{(cases|dcases|rcases|numcases|subnumcases|empheq|align\*?|aligned|alignat\*?|alignedat|gather\*?|gathered|equation\*?|eqnarray\*?|array|tabular|matrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix)\}[\s\S]*?\\end\{\1\}/g;
    processed = processed.replace(bareEnvRegex, (m) => addMathToken(m, true));

    // (g) 裸の \systeme{...}
    processed = processed.replace(/\\systeme(?:\[[^\]]*\])?\{[^{}]+\}/g, (m) => addMathToken(m, true));

    // 3. コードブロックを戻してから Markdown を HTML に変換
    processed = processed.replace(/%%CODETOKEN(\d+)%%/g, (_, idx) => codeTokens[Number(idx)] || '');
    let html = marked.parse(processed, {
      breaks: true,
      gfm: true
    });

    // 4. 保護していた数式トークンを KaTeX でレンダリングして埋め込む
    html = html.replace(/%%MATHTOKEN(\d+)%%/g, (_, idxStr) => {
      const token = mathTokens[Number(idxStr)];
      if (!token) return '';
      const normalized = this.normalizeLatex(token.math, token.display);
      if (window.katex) {
        try {
          return window.katex.renderToString(normalized, {
            displayMode: token.display,
            throwOnError: false,
            errorColor: '#ef4444',
            strict: false,
            trust: true
          });
        } catch (e) {
          console.warn('KaTeX render error:', e);
        }
      }
      return token.display ? `$$${this.escapeHtml(normalized)}$$` : `$${this.escapeHtml(normalized)}$`;
    });

    // 5. グラフトークンをコンテナ要素に置換
    html = html.replace(/(?:<p>\s*)?%%GRAPHTOKEN(\d+)%%(?:\s*<\/p>)?/g, (_, idxStr) => {
      return `<div class="math-graph-widget" data-graph-idx="${idxStr}"></div>`;
    });

    targetEl.innerHTML = html;

    // 6. インタラクティブグラフウィジェットをマウント
    if (graphTokens.length > 0 && !targetEl.classList.contains('index-card-preview')) {
      targetEl.querySelectorAll('.math-graph-widget[data-graph-idx]').forEach(widgetEl => {
        const idx = Number(widgetEl.getAttribute('data-graph-idx'));
        if (graphTokens[idx] !== undefined) {
          this.mountGraphWidget(widgetEl, graphTokens[idx]);
        }
      });
    }
  }

  // --------------------------------------------------------
  // インタラクティブ関数グラフ描画エンジン (Canvas / 数式・不等式パーサー)
  // --------------------------------------------------------
  compileMathExpr2D(rawExpr, primaryVar = 'x') {
    if (!rawExpr || !String(rawExpr).trim()) return () => NaN;
    let s = String(rawExpr).trim().replace(/^\$+|\$+$/g, '').trim();

    // 全角記号・LaTeX構文の正規化
    s = s.replace(/＋/g, '+')
         .replace(/[－−–—]/g, '-')
         .replace(/[＊×]/g, '*')
         .replace(/\\times\b|\\cdot\b/g, '*')
         .replace(/[／÷]/g, '/')
         .replace(/\\div\b/g, '/')
         .replace(/＾/g, '^')
         .replace(/（/g, '(')
         .replace(/）/g, ')')
         .replace(/｜/g, '|')
         .replace(/\\left|\\right/g, '');

    // \frac{a}{b}, \dfrac{a}{b}, \sqrt{a} の展開
    for (let i = 0; i < 4; i++) {
      s = s.replace(/\\d?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '(($1)/($2))');
      s = s.replace(/\\sqrt\s*\{([^{}]*)\}/g, 'sqrt($1)');
    }
    s = s.replace(/\{/g, '(').replace(/\}/g, ')');

    // |expr| を abs(expr) に変換
    for (let i = 0; i < 3; i++) {
      const next = s.replace(/\|([^|]+)\|/g, 'abs($1)');
      if (next === s) break;
      s = next;
    }

    // \sin, \cos, \pi 等のバックスラッシュを除去
    s = s.replace(/\\([a-zA-Z]+)/g, '$1');

    const FUNC_MAP = {
      sin: Math.sin, cos: Math.cos, tan: Math.tan,
      asin: Math.asin, acos: Math.acos, atan: Math.atan,
      arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan,
      sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
      sec: (v) => 1 / Math.cos(v), csc: (v) => 1 / Math.sin(v), cot: (v) => 1 / Math.tan(v),
      log10: Math.log10, log2: Math.log2, log: Math.log, ln: Math.log,
      exp: Math.exp, sqrt: Math.sqrt, cbrt: Math.cbrt,
      abs: Math.abs, floor: Math.floor, ceil: Math.ceil, round: Math.round, sign: Math.sign
    };
    const FUNC_NAMES = Object.keys(FUNC_MAP).sort((a, b) => b.length - a.length);

    // トークナイザー (2変数 x, y および媒介変数 t 対応)
    const rawTokens = [];
    let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (/\s/.test(ch)) { i++; continue; }
      if (/\d/.test(ch) || (ch === '.' && /\d/.test(s[i + 1] || ''))) {
        let numStr = '';
        while (i < s.length && /[\d.]/.test(s[i])) { numStr += s[i++]; }
        rawTokens.push({ type: 'NUMBER', value: parseFloat(numStr) });
        continue;
      }
      if ('+-*/^'.includes(ch)) {
        rawTokens.push({ type: 'OP', value: ch });
        i++;
        continue;
      }
      if (ch === '(') { rawTokens.push({ type: 'LPAREN' }); i++; continue; }
      if (ch === ')') { rawTokens.push({ type: 'RPAREN' }); i++; continue; }
      if (ch === 'π') { rawTokens.push({ type: 'CONST', value: Math.PI }); i++; continue; }

      if (/[a-zA-Z]/.test(ch)) {
        const rest = s.slice(i);
        let matched = false;
        for (const fn of FUNC_NAMES) {
          if (rest.toLowerCase().startsWith(fn)) {
            const after = rest[fn.length] || '';
            if (!/[a-zA-Z]/.test(after) || /^[xyzt]$/i.test(after)) {
              rawTokens.push({ type: 'FUNC', fn: FUNC_MAP[fn], name: fn });
              i += fn.length;
              matched = true;
              break;
            }
          }
        }
        if (matched) continue;

        if (rest.toLowerCase().startsWith('pi')) {
          rawTokens.push({ type: 'CONST', value: Math.PI });
          i += 2;
          continue;
        }
        if (ch === 'x' || ch === 'X') {
          rawTokens.push({ type: 'VAR_X' });
          i++;
          continue;
        }
        if (ch === 'y' || ch === 'Y') {
          rawTokens.push({ type: 'VAR_Y' });
          i++;
          continue;
        }
        if (ch.toLowerCase() === primaryVar.toLowerCase()) {
          rawTokens.push({ type: 'VAR_X' });
          i++;
          continue;
        }
        if (ch === 'e' || ch === 'E') {
          rawTokens.push({ type: 'CONST', value: Math.E });
          i++;
          continue;
        }
        rawTokens.push({ type: 'VAR_X' });
        i++;
        continue;
      }
      i++;
    }

    // 暗黙の乗算 (*) を補完 (例: 2x -> 2*x, 2xy -> 2*x*y, (x-y)(x+y) -> (x-y)*(x+y))
    const isValToken = (t) => t.type === 'NUMBER' || t.type === 'CONST' || t.type === 'VAR_X' || t.type === 'VAR_Y' || t.type === 'RPAREN';
    const isRightValToken = (t) => t.type === 'NUMBER' || t.type === 'CONST' || t.type === 'VAR_X' || t.type === 'VAR_Y' || t.type === 'FUNC' || t.type === 'LPAREN';
    const tokens = [];
    for (let k = 0; k < rawTokens.length; k++) {
      const curr = rawTokens[k];
      if (k > 0 && isValToken(rawTokens[k - 1]) && isRightValToken(curr)) {
        tokens.push({ type: 'OP', value: '*' });
      }
      tokens.push(curr);
    }

    // 再帰下降パーサー (-x^2 = -(x^2), e^-x = e^(-x))
    let pos = 0;
    const peek = () => tokens[pos];
    const consume = () => tokens[pos++];

    const parseExpr = () => {
      let left = parseTerm();
      while (peek() && peek().type === 'OP' && (peek().value === '+' || peek().value === '-')) {
        const op = consume().value;
        const right = parseTerm();
        const prevLeft = left;
        left = op === '+' ? (x, y) => prevLeft(x, y) + right(x, y) : (x, y) => prevLeft(x, y) - right(x, y);
      }
      return left;
    };

    const parseTerm = () => {
      let left = parseUnary();
      while (peek() && peek().type === 'OP' && (peek().value === '*' || peek().value === '/')) {
        const op = consume().value;
        const right = parseUnary();
        const prevLeft = left;
        left = op === '*' ? (x, y) => prevLeft(x, y) * right(x, y) : (x, y) => prevLeft(x, y) / right(x, y);
      }
      return left;
    };

    const parseUnary = () => {
      if (peek() && peek().type === 'OP' && (peek().value === '+' || peek().value === '-')) {
        const op = consume().value;
        const operand = parseUnary();
        return op === '-' ? (x, y) => -operand(x, y) : operand;
      }
      return parsePower();
    };

    const parsePower = () => {
      const base = parsePrimary();
      if (peek() && peek().type === 'OP' && peek().value === '^') {
        consume();
        const exp = parseUnary();
        return (x, y) => Math.pow(base(x, y), exp(x, y));
      }
      return base;
    };

    const parsePrimary = () => {
      const t = peek();
      if (!t) return () => NaN;
      if (t.type === 'NUMBER') { consume(); const val = t.value; return () => val; }
      if (t.type === 'CONST') { consume(); const val = t.value; return () => val; }
      if (t.type === 'VAR_X') { consume(); return (x) => x; }
      if (t.type === 'VAR_Y') { consume(); return (_, y) => y; }
      if (t.type === 'FUNC') {
        consume();
        const fn = t.fn;
        if (peek() && peek().type === 'LPAREN') {
          consume();
          const arg = parseExpr();
          if (peek() && peek().type === 'RPAREN') consume();
          return (x, y) => fn(arg(x, y));
        }
        const arg = parseUnary();
        return (x, y) => fn(arg(x, y));
      }
      if (t.type === 'LPAREN') {
        consume();
        const inner = parseExpr();
        if (peek() && peek().type === 'RPAREN') consume();
        return inner;
      }
      consume();
      return () => NaN;
    };

    try {
      const ast = parseExpr();
      return (x, y = 0) => {
        try {
          const res = ast(x, y);
          return typeof res === 'number' ? res : NaN;
        } catch (_) {
          return NaN;
        }
      };
    } catch (_) {
      return () => NaN;
    }
  }

  compileMathExpr(rawExpr, varName = 'x') {
    const fn2d = this.compileMathExpr2D(rawExpr, varName);
    if (varName.toLowerCase() === 'y') {
      return (y) => fn2d(0, y);
    }
    return (x) => fn2d(x, 0);
  }

  evalMathConst(exprStr, fallback = 0) {
    if (exprStr === undefined || exprStr === null) return fallback;
    const val = this.compileMathExpr2D(String(exprStr))(0, 0);
    return Number.isFinite(val) ? val : fallback;
  }

  parseBracketPair(str, fallback = [-5, 5]) {
    const m = String(str).match(/\[([^\],]+),([^\]]+)\]/);
    if (!m) return fallback;
    const a = this.evalMathConst(m[1], fallback[0]);
    const b = this.evalMathConst(m[2], fallback[1]);
    return a < b ? [a, b] : fallback;
  }

  normalizeInequalityOperators(str) {
    return String(str)
      .replace(/\\(?:leqq|leqslant|le)\b|[≦≤]/g, '<=')
      .replace(/\\(?:geqq|geqslant|ge)\b|[≧≥]/g, '>=')
      .replace(/\\lt\b/g, '<')
      .replace(/\\gt\b/g, '>');
  }

  formatInequalityDisplay(str) {
    return String(str)
      .replace(/<=/g, ' ≦ ')
      .replace(/>=/g, ' ≧ ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  parseSingleInequalityClause(clause, color, opts, addBoundaryCurve = true) {
    const norm = this.normalizeInequalityOperators(clause);
    const tokens = norm.split(/(<=|>=|<|>)/).map(t => t.trim());
    if (tokens.length < 3) return [];

    // a <= b <= c のような連なった不等式も分解して両方サポート
    const pairs = [];
    for (let i = 0; i <= tokens.length - 3; i += 2) {
      const lhs = tokens[i];
      const op = tokens[i + 1];
      const rhs = tokens[i + 2];
      if (lhs && op && rhs) {
        pairs.push({ lhs, op, rhs });
      }
    }

    const results = [];
    pairs.forEach((p, idx) => {
      const fnL = this.compileMathExpr2D(p.lhs);
      const fnR = this.compileMathExpr2D(p.rhs);
      const diffFn = (x, y) => fnL(x, y) - fnR(x, y);
      const strict = p.op === '<' || p.op === '>';
      let checkFn;
      if (p.op === '<=') checkFn = (x, y) => diffFn(x, y) <= 1e-9;
      else if (p.op === '<') checkFn = (x, y) => diffFn(x, y) < -1e-9;
      else if (p.op === '>=') checkFn = (x, y) => diffFn(x, y) >= -1e-9;
      else checkFn = (x, y) => diffFn(x, y) > 1e-9;

      // 境界線データの自動生成 (実線: 境界を含む / 破線: 境界を含まない)
      let boundaryCurve = null;
      if (addBoundaryCurve && opts.boundary !== 'false' && !opts.noboundary) {
        const isDashed = opts.dashed !== undefined ? Boolean(opts.dashed) : strict;
        const lbl = idx === 0
          ? (opts.label !== undefined ? opts.label : this.formatInequalityDisplay(clause))
          : '';
        const hasYInL = /[yY]/.test(p.lhs);
        const hasYInR = /[yY]/.test(p.rhs);
        const hasXInL = /[xX]/.test(p.lhs);
        const hasXInR = /[xX]/.test(p.rhs);

        if (/^[yY]$/.test(p.lhs) && !hasYInR) {
          boundaryCurve = { type: 'y', fn: (x) => fnR(x, 0), color, dashed: isDashed, label: lbl };
        } else if (/^[yY]$/.test(p.rhs) && !hasYInL) {
          boundaryCurve = { type: 'y', fn: (x) => fnL(x, 0), color, dashed: isDashed, label: lbl };
        } else if (/^[xX]$/.test(p.lhs) && !hasXInR) {
          boundaryCurve = { type: 'x', fn: (y) => fnR(0, y), color, dashed: isDashed, label: lbl };
        } else if (/^[xX]$/.test(p.rhs) && !hasXInL) {
          boundaryCurve = { type: 'x', fn: (y) => fnL(0, y), color, dashed: isDashed, label: lbl };
        } else {
          boundaryCurve = { type: 'implicit', fn2d: diffFn, color, dashed: isDashed, label: lbl };
        }
      }

      results.push({
        checkFn,
        strict,
        color,
        boundaryCurve
      });
    });

    return results;
  }

  parseGraphSpec(specText) {
    const palette = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];
    let colorIdx = 0;
    const nextColor = () => palette[(colorIdx++) % palette.length];

    const config = {
      title: '関数グラフ',
      domain: [-5, 5],
      range: [-5, 5],
      grid: true,
      shades: [],
      ineqGroups: [],
      curves: [],
      points: []
    };

    const defaultIneqList = [];
    let defaultRegionColor = null;
    let defaultRegionLabel = '';

    const lines = String(specText || '').split('\n');
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#') || line.startsWith('//')) continue;

      const parts = line.split('|').map(p => p.trim());
      const main = parts[0];
      const opts = {};

      for (let i = 1; i < parts.length; i++) {
        const opt = parts[i];
        const lower = opt.toLowerCase();
        if (lower === 'dashed') { opts.dashed = true; continue; }
        if (lower === 'dotted') { opts.dotted = true; continue; }
        if (lower === 'guide') { opts.guide = true; continue; }
        if (lower === 'noboundary') { opts.noboundary = true; continue; }
        const kv = opt.match(/^([a-zA-Z_]+)\s*:\s*(.+)$/);
        if (kv) {
          const k = kv[1].toLowerCase();
          const v = kv[2].trim();
          opts[k] = v;
        }
      }

      // トップレベル設定行
      const settingMatch = main.match(/^([a-zA-Z_]+)\s*:\s*(.+)$/);
      if (settingMatch) {
        const key = settingMatch[1].toLowerCase();
        const val = settingMatch[2].trim();

        if (key === 'title') {
          config.title = val;
          continue;
        }
        if (key === 'domain' || key === 'xrange' || key === 'x') {
          config.domain = this.parseBracketPair(val, config.domain);
          continue;
        }
        if (key === 'range' || key === 'yrange' || key === 'y') {
          config.range = this.parseBracketPair(val, config.range);
          continue;
        }
        if (key === 'grid') {
          config.grid = val.toLowerCase() !== 'false';
          continue;
        }

        // 0. 不等式領域グループ指定 (region: x >= 0, y >= 0, x + y <= 3 | color: #3b82f6 | label: 領域 D)
        if (key === 'region' || key === 'ineq' || key === 'system') {
          const clauses = val.split(/\s*(?:&&|かつ|,)\s*/).filter(Boolean);
          const groupColor = opts.color || nextColor();
          const groupChecks = [];
          clauses.forEach((cl, cIdx) => {
            const cColor = clauses.length === 1 ? groupColor : (opts.color || nextColor());
            const cOpts = cIdx === 0 ? opts : { ...opts, label: this.formatInequalityDisplay(cl) };
            const parsedList = this.parseSingleInequalityClause(cl, cColor, cOpts, true);
            parsedList.forEach(item => {
              groupChecks.push(item);
              if (item.boundaryCurve) config.curves.push(item.boundaryCurve);
            });
          });
          if (groupChecks.length > 0) {
            config.ineqGroups.push({
              items: groupChecks,
              color: groupColor,
              label: opts.label || ''
            });
          }
          continue;
        }

        // 1. 面積・定積分塗りつぶし (shade: f(x), g(x) | from: a | to: b)
        if (key === 'shade' || key === 'area') {
          const exprs = val.split(',').map(e => e.trim()).filter(Boolean);
          const fn1 = this.compileMathExpr(exprs[0].replace(/^[yY]\s*=\s*/, ''), 'x');
          const fn2 = exprs[1] ? this.compileMathExpr(exprs[1].replace(/^[yY]\s*=\s*/, ''), 'x') : () => 0;
          let [fromX, toX] = opts.domain || opts.x
            ? this.parseBracketPair(opts.domain || opts.x, config.domain)
            : [...config.domain];
          if (opts.from !== undefined) fromX = this.evalMathConst(opts.from, fromX);
          if (opts.to !== undefined) toX = this.evalMathConst(opts.to, toX);
          config.shades.push({
            fn1,
            fn2,
            from: Math.min(fromX, toX),
            to: Math.max(fromX, toX),
            color: opts.color || '#3b82f6',
            label: opts.label || ''
          });
          continue;
        }

        // 2. 点プロット (point: (x, y) | label: P | guide)
        if (key === 'point' || key === 'pt') {
          const pm = val.match(/\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/);
          if (pm) {
            const px = this.evalMathConst(pm[1], 0);
            const py = this.evalMathConst(pm[2], 0);
            config.points.push({
              x: px,
              y: py,
              color: opts.color || '#ef4444',
              label: opts.label !== undefined ? opts.label : `(${pm[1].trim()}, ${pm[2].trim()})`,
              guide: opts.guide !== undefined ? opts.guide !== 'false' : true
            });
          }
          continue;
        }

        // 3. 接線の自動計算・描画 (tangent: f(x) | at: a)
        if (key === 'tangent') {
          const cleanExpr = val.replace(/^[yY]\s*=\s*/, '');
          const fn = this.compileMathExpr(cleanExpr, 'x');
          const a = this.evalMathConst(opts.at ?? opts.x ?? 0, 0);
          const fa = fn(a);
          const h = 1e-5;
          const slope = (fn(a + h) - fn(a - h)) / (2 * h);
          if (Number.isFinite(fa) && Number.isFinite(slope)) {
            const color = opts.color || nextColor();
            config.curves.push({
              type: 'y',
              fn: (x) => slope * (x - a) + fa,
              color,
              dashed: Boolean(opts.dashed),
              dotted: Boolean(opts.dotted),
              label: opts.label || `x=${a} における接線`,
              subDomain: opts.domain ? this.parseBracketPair(opts.domain, null) : null
            });
            config.points.push({
              x: a,
              y: fa,
              color,
              label: `(${Number(a.toFixed(2))}, ${Number(fa.toFixed(2))})`,
              guide: true
            });
          }
          continue;
        }

        // 4. 媒介変数曲線 (param: (x(t), y(t)) | t: [0, 2*pi])
        if (key === 'param' || key === 'parametric') {
          const pm = val.match(/\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/);
          if (pm) {
            const fx = this.compileMathExpr(pm[1], 't');
            const fy = this.compileMathExpr(pm[2], 't');
            const tRange = this.parseBracketPair(opts.t || opts.domain || '[0, 2*pi]', [0, 2 * Math.PI]);
            config.curves.push({
              type: 'param',
              fx,
              fy,
              tMin: tRange[0],
              tMax: tRange[1],
              color: opts.color || nextColor(),
              dashed: Boolean(opts.dashed),
              dotted: Boolean(opts.dotted),
              label: opts.label || `(${pm[1].trim()}, ${pm[2].trim()})`
            });
          }
          continue;
        }

        // 5. 円 (circle: (cx, cy), r)
        if (key === 'circle') {
          const cm = val.match(/\(\s*([^,]+)\s*,\s*([^)]+)\s*\)\s*,\s*(?:r\s*=\s*)?(.+)/);
          if (cm) {
            const cx = this.evalMathConst(cm[1], 0);
            const cy = this.evalMathConst(cm[2], 0);
            const r = Math.abs(this.evalMathConst(cm[3], 1));
            config.curves.push({
              type: 'param',
              fx: (t) => cx + r * Math.cos(t),
              fy: (t) => cy + r * Math.sin(t),
              tMin: 0,
              tMax: 2 * Math.PI,
              color: opts.color || nextColor(),
              dashed: Boolean(opts.dashed),
              dotted: Boolean(opts.dotted),
              label: opts.label || `円 (中心(${cx},${cy}), r=${Number(r.toFixed(2))})`
            });
          }
          continue;
        }
      }

      // 6. 不等式 (例: y >= x^2 - 1, x^2 + y^2 <= 4, 1 <= x^2 + y^2 < 4, x + 2y <= 6)
      const normMain = this.normalizeInequalityOperators(main);
      if (/(<=|>=|<|>)/.test(normMain)) {
        const clauses = main.split(/\s*(?:&&|かつ|,)\s*/).filter(Boolean);
        clauses.forEach((cl) => {
          const cColor = opts.color || nextColor();
          if (!defaultRegionColor) defaultRegionColor = opts.region_color || '#3b82f6';
          if (opts.region_label) defaultRegionLabel = opts.region_label;
          const parsedList = this.parseSingleInequalityClause(cl, cColor, opts, true);
          parsedList.forEach(item => {
            defaultIneqList.push(item);
            if (item.boundaryCurve) config.curves.push(item.boundaryCurve);
          });
        });
        continue;
      }

      // 7. x = g(y) または垂直線 x = c (右辺に x を含まない場合)
      if (/^[xX]\s*=/.test(main)) {
        const rhs = main.replace(/^[xX]\s*=\s*/, '').trim();
        if (!/[xX]/.test(rhs)) {
          const fnY = this.compileMathExpr(rhs, 'y');
          config.curves.push({
            type: 'x',
            fn: fnY,
            rawExpr: main,
            color: opts.color || nextColor(),
            dashed: Boolean(opts.dashed),
            dotted: Boolean(opts.dotted),
            label: opts.label !== undefined ? opts.label : main
          });
          continue;
        }
      }

      // 8. 2変数陰関数方程式 F(x, y) = G(x, y) (例: x^2 + y^2 = 4, x^2/9 + y^2/4 = 1, x + 2y = 6)
      if (main.includes('=') && !/^(?:[yY]|[a-zA-Z]\s*\(\s*x\s*\))\s*=/.test(main)) {
        const eqParts = main.split('=');
        if (eqParts.length === 2) {
          const fnL = this.compileMathExpr2D(eqParts[0]);
          const fnR = this.compileMathExpr2D(eqParts[1]);
          config.curves.push({
            type: 'implicit',
            fn2d: (x, y) => fnL(x, y) - fnR(x, y),
            color: opts.color || nextColor(),
            dashed: Boolean(opts.dashed),
            dotted: Boolean(opts.dotted),
            label: opts.label !== undefined ? opts.label : main
          });
          continue;
        }
      }

      // 9. 陽関数 y = f(x), f(x) = ..., または式のみ
      let exprStr = main;
      if (/^(?:[yY]|[a-zA-Z]\s*\(\s*x\s*\))\s*=/.test(main)) {
        exprStr = main.replace(/^(?:[yY]|[a-zA-Z]\s*\(\s*x\s*\))\s*=\s*/, '').trim();
      }
      const fnX = this.compileMathExpr(exprStr, 'x');
      config.curves.push({
        type: 'y',
        fn: fnX,
        rawExpr: exprStr,
        color: opts.color || nextColor(),
        dashed: Boolean(opts.dashed),
        dotted: Boolean(opts.dotted),
        label: opts.label !== undefined ? opts.label : (main.includes('=') ? main : `y = ${main}`),
        subDomain: (opts.domain || opts.x) ? this.parseBracketPair(opts.domain || opts.x, null) : null
      });
    }

    if (defaultIneqList.length > 0) {
      config.ineqGroups.push({
        items: defaultIneqList,
        color: defaultRegionColor || '#3b82f6',
        label: defaultRegionLabel
      });
    }

    return config;
  }

  // マーチング・スクエア法による2変数陰関数 F(x, y) = 0 の連続ポリライン抽出
  traceImplicitContourPolylines(fn2d, view, w, h) {
    const nx = 140;
    const ny = 140;
    const vals = new Float64Array((nx + 1) * (ny + 1));
    for (let j = 0; j <= ny; j++) {
      const y = view.ymax - (j / ny) * (view.ymax - view.ymin);
      for (let i = 0; i <= nx; i++) {
        const x = view.xmin + (i / nx) * (view.xmax - view.xmin);
        vals[j * (nx + 1) + i] = fn2d(x, y);
      }
    }

    const cellW = w / nx;
    const cellH = h / ny;
    const interp = (v1, v2) => {
      const denom = v1 - v2;
      if (Math.abs(denom) < 1e-12) return 0.5;
      return Math.min(Math.max(v1 / denom, 0), 1);
    };

    const segments = [];
    for (let j = 0; j < ny; j++) {
      const py0 = j * cellH;
      const py1 = (j + 1) * cellH;
      for (let i = 0; i < nx; i++) {
        const px0 = i * cellW;
        const px1 = (i + 1) * cellW;

        const v0 = vals[j * (nx + 1) + i];
        const v1 = vals[j * (nx + 1) + (i + 1)];
        const v2 = vals[(j + 1) * (nx + 1) + (i + 1)];
        const v3 = vals[(j + 1) * (nx + 1) + i];

        if (!Number.isFinite(v0) || !Number.isFinite(v1) || !Number.isFinite(v2) || !Number.isFinite(v3)) continue;

        let mask = 0;
        if (v0 >= 0) mask |= 1;
        if (v1 >= 0) mask |= 2;
        if (v2 >= 0) mask |= 4;
        if (v3 >= 0) mask |= 8;
        if (mask === 0 || mask === 15) continue;

        const top = { x: px0 + interp(v0, v1) * cellW, y: py0 };
        const right = { x: px1, y: py0 + interp(v1, v2) * cellH };
        const bottom = { x: px0 + interp(v3, v2) * cellW, y: py1 };
        const left = { x: px0, y: py0 + interp(v0, v3) * cellH };

        const addSeg = (pA, pB) => segments.push({ x1: pA.x, y1: pA.y, x2: pB.x, y2: pB.y, used: false });

        switch (mask) {
          case 1: case 14: addSeg(left, top); break;
          case 2: case 13: addSeg(top, right); break;
          case 3: case 12: addSeg(left, right); break;
          case 4: case 11: addSeg(right, bottom); break;
          case 5: addSeg(left, bottom); addSeg(top, right); break;
          case 6: case 9: addSeg(top, bottom); break;
          case 7: case 8: addSeg(left, bottom); break;
          case 10: addSeg(left, top); addSeg(bottom, right); break;
        }
      }
    }

    // 破線 (setLineDash) が綺麗に描画されるよう隣接セグメントを連続ポリラインに結合
    const keyOf = (x, y) => `${Math.round(x * 4)},${Math.round(y * 4)}`;
    const endpointMap = new Map();
    segments.forEach((seg, idx) => {
      const k1 = keyOf(seg.x1, seg.y1);
      const k2 = keyOf(seg.x2, seg.y2);
      if (!endpointMap.has(k1)) endpointMap.set(k1, []);
      if (!endpointMap.has(k2)) endpointMap.set(k2, []);
      endpointMap.get(k1).push({ idx, atStart: true });
      endpointMap.get(k2).push({ idx, atStart: false });
    });

    const polylines = [];
    for (let i = 0; i < segments.length; i++) {
      const startSeg = segments[i];
      if (startSeg.used) continue;
      startSeg.used = true;

      const chain = [{ x: startSeg.x1, y: startSeg.y1 }, { x: startSeg.x2, y: startSeg.y2 }];

      // 前方へ延長
      let curr = chain[chain.length - 1];
      while (true) {
        const list = endpointMap.get(keyOf(curr.x, curr.y));
        if (!list) break;
        const nextEntry = list.find(entry => !segments[entry.idx].used);
        if (!nextEntry) break;
        const nextSeg = segments[nextEntry.idx];
        nextSeg.used = true;
        curr = nextEntry.atStart ? { x: nextSeg.x2, y: nextSeg.y2 } : { x: nextSeg.x1, y: nextSeg.y1 };
        chain.push(curr);
      }

      // 後方へ延長
      curr = chain[0];
      while (true) {
        const list = endpointMap.get(keyOf(curr.x, curr.y));
        if (!list) break;
        const prevEntry = list.find(entry => !segments[entry.idx].used);
        if (!prevEntry) break;
        const prevSeg = segments[prevEntry.idx];
        prevSeg.used = true;
        curr = prevEntry.atStart ? { x: prevSeg.x2, y: prevSeg.y2 } : { x: prevSeg.x1, y: prevSeg.y1 };
        chain.unshift(curr);
      }

      polylines.push(chain);
    }

    return polylines;
  }

  niceGridStep(span) {
    if (!Number.isFinite(span) || span <= 0) return 1;
    const raw = span / 8;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    if (norm < 1.5) return 1 * mag;
    if (norm < 3.5) return 2 * mag;
    if (norm < 7.5) return 5 * mag;
    return 10 * mag;
  }

  formatTickNumber(val, step) {
    if (Math.abs(val) < 1e-10) return '0';
    const decimals = step < 0.01 ? 3 : step < 0.1 ? 2 : step < 1 ? 1 : 0;
    return Number(val.toFixed(decimals)).toString();
  }

  mountGraphWidget(widgetEl, specText) {
    const spec = this.parseGraphSpec(specText);
    const initView = {
      xmin: spec.domain[0],
      xmax: spec.domain[1],
      ymin: spec.range[0],
      ymax: spec.range[1]
    };
    const view = { ...initView };
    let hoverState = null;

    widgetEl.innerHTML = `
      <div class="graph-toolbar">
        <div class="graph-title">📈 ${this.escapeHtml(spec.title)}</div>
        <div class="graph-controls">
          <span class="graph-coords-badge">(x, y) = (-, -)</span>
          <button type="button" class="graph-ctrl-btn" data-act="zoom-in" title="拡大">＋</button>
          <button type="button" class="graph-ctrl-btn" data-act="zoom-out" title="縮小">－</button>
          <button type="button" class="graph-ctrl-btn" data-act="reset" title="表示範囲をリセット">リセット</button>
          <button type="button" class="graph-ctrl-btn" data-act="download" title="グラフをPNG画像で保存">PNG保存</button>
        </div>
      </div>
      <div class="graph-canvas-wrap">
        <canvas class="graph-canvas"></canvas>
      </div>
      <div class="graph-legend"></div>
    `;

    const canvas = widgetEl.querySelector('.graph-canvas');
    const coordsBadge = widgetEl.querySelector('.graph-coords-badge');
    const legendEl = widgetEl.querySelector('.graph-legend');

    // 凡例の生成
    const legendItems = [];
    spec.curves.forEach(c => {
      if (c.label) {
        legendItems.push(`<span class="graph-legend-item"><span class="graph-legend-swatch" style="background:${this.escapeHtml(c.color)}"></span><span>${this.escapeHtml(c.label)}</span></span>`);
      }
    });
    spec.shades.forEach(sh => {
      const lbl = sh.label || `面積区間 [${Number(sh.from.toFixed(2))}, ${Number(sh.to.toFixed(2))}]`;
      legendItems.push(`<span class="graph-legend-item"><span class="graph-legend-swatch swatch-shade" style="background:${this.escapeHtml(sh.color)}"></span><span>${this.escapeHtml(lbl)}</span></span>`);
    });
    if (spec.ineqGroups && spec.ineqGroups.length > 0) {
      spec.ineqGroups.forEach(grp => {
        const hasStrict = grp.items.some(it => it.strict);
        const hasInclusive = grp.items.some(it => !it.strict);
        let boundaryNote = '境界線を含む（実線）';
        if (hasStrict && hasInclusive) boundaryNote = '実線:境界を含む / 破線:含まない';
        else if (hasStrict) boundaryNote = '境界線を含まない（破線）';
        const lbl = grp.label ? `${grp.label}（${boundaryNote}）` : `不等式の領域（${boundaryNote}）`;
        legendItems.push(`<span class="graph-legend-item"><span class="graph-legend-swatch swatch-shade" style="background:${this.escapeHtml(grp.color)}"></span><span>${this.escapeHtml(lbl)}</span></span>`);
      });
    }
    spec.points.forEach(pt => {
      if (pt.label) {
        legendItems.push(`<span class="graph-legend-item"><span class="graph-legend-swatch swatch-point" style="background:${this.escapeHtml(pt.color)}"></span><span>${this.escapeHtml(pt.label)}</span></span>`);
      }
    });
    legendEl.innerHTML = legendItems.join('');

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(rect.width || 560, 260);
      const h = Math.max(rect.height || 340, 200);
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }

      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.scale(dpr, dpr);

      const isDark = document.body.classList.contains('theme-dark');
      const bgCol = isDark ? '#131b2e' : '#ffffff';
      const gridCol = isDark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(148, 163, 184, 0.24)';
      const subGridCol = isDark ? 'rgba(148, 163, 184, 0.06)' : 'rgba(148, 163, 184, 0.10)';
      const axisCol = isDark ? '#94a3b8' : '#475569';
      const textCol = isDark ? '#cbd5e1' : '#334155';

      // 背景クリア
      ctx.fillStyle = bgCol;
      ctx.fillRect(0, 0, w, h);

      const toPxX = (x) => ((x - view.xmin) / (view.xmax - view.xmin)) * w;
      const toPxY = (y) => h - ((y - view.ymin) / (view.ymax - view.ymin)) * h;
      const toMathX = (px) => view.xmin + (px / w) * (view.xmax - view.xmin);
      const toMathY = (py) => view.ymin + ((h - py) / h) * (view.ymax - view.ymin);

      const xStep = this.niceGridStep(view.xmax - view.xmin);
      const yStep = this.niceGridStep(view.ymax - view.ymin);

      // 1. グリッド線
      if (spec.grid) {
        // サブグリッド
        ctx.strokeStyle = subGridCol;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const xSub = xStep / 2;
        for (let gx = Math.ceil(view.xmin / xSub) * xSub; gx <= view.xmax; gx += xSub) {
          const px = toPxX(gx);
          ctx.moveTo(px, 0);
          ctx.lineTo(px, h);
        }
        const ySub = yStep / 2;
        for (let gy = Math.ceil(view.ymin / ySub) * ySub; gy <= view.ymax; gy += ySub) {
          const py = toPxY(gy);
          ctx.moveTo(0, py);
          ctx.lineTo(w, py);
        }
        ctx.stroke();

        // メイングリッド
        ctx.strokeStyle = gridCol;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let gx = Math.ceil(view.xmin / xStep) * xStep; gx <= view.xmax; gx += xStep) {
          const px = toPxX(gx);
          ctx.moveTo(px, 0);
          ctx.lineTo(px, h);
        }
        for (let gy = Math.ceil(view.ymin / yStep) * yStep; gy <= view.ymax; gy += yStep) {
          const py = toPxY(gy);
          ctx.moveTo(0, py);
          ctx.lineTo(w, py);
        }
        ctx.stroke();
      }

      // 2. 面積・定積分塗りつぶし (半透明カラー + 教科書風の斜線ハッチング)
      spec.shades.forEach(sh => {
        const x0 = Math.max(sh.from, view.xmin);
        const x1 = Math.min(sh.to, view.xmax);
        if (x0 >= x1) return;

        const steps = 220;
        const dx = (x1 - x0) / steps;
        const topPts = [];
        const botPts = [];

        for (let k = 0; k <= steps; k++) {
          const x = x0 + k * dx;
          const y1 = sh.fn1(x);
          const y2 = sh.fn2(x);
          if (Number.isFinite(y1) && Number.isFinite(y2)) {
            topPts.push({ px: toPxX(x), py: toPxY(y1) });
            botPts.push({ px: toPxX(x), py: toPxY(y2) });
          }
        }
        if (topPts.length < 2) return;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(topPts[0].px, topPts[0].py);
        for (let k = 1; k < topPts.length; k++) ctx.lineTo(topPts[k].px, topPts[k].py);
        for (let k = botPts.length - 1; k >= 0; k--) ctx.lineTo(botPts[k].px, botPts[k].py);
        ctx.closePath();

        ctx.fillStyle = sh.color;
        ctx.globalAlpha = isDark ? 0.22 : 0.18;
        ctx.fill();

        // 斜線ハッチング
        ctx.clip();
        ctx.strokeStyle = sh.color;
        ctx.globalAlpha = isDark ? 0.45 : 0.35;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        const spacing = 10;
        for (let d = -h; d < w + h; d += spacing) {
          ctx.moveTo(d, 0);
          ctx.lineTo(d - h, h);
        }
        ctx.stroke();
        ctx.restore();
      });

      // 2.5. 2変数不等式・連立不等式の領域塗りつぶし (半透明カラー + 45度斜線ハッチング)
      if (spec.ineqGroups && spec.ineqGroups.length > 0) {
        spec.ineqGroups.forEach(grp => {
          const inRegion = (px, py) => {
            const x = toMathX(px);
            const y = toMathY(py);
            for (let k = 0; k < grp.items.length; k++) {
              if (!grp.items[k].checkFn(x, y)) return false;
            }
            return true;
          };

          // (a) 半透明スキャンライン塗りつぶし
          ctx.save();
          ctx.fillStyle = grp.color;
          ctx.globalAlpha = isDark ? 0.22 : 0.17;
          const stepPx = 2;
          for (let py = 0; py < h; py += stepPx) {
            let runStart = -1;
            for (let px = 0; px <= w; px += stepPx) {
              const inside = px < w && inRegion(px + 0.5, py + 0.5);
              if (inside && runStart < 0) {
                runStart = px;
              } else if (!inside && runStart >= 0) {
                ctx.fillRect(runStart, py, px - runStart, stepPx);
                runStart = -1;
              }
            }
          }

          // (b) 教科書風の45度ベクター斜線ハッチング
          ctx.strokeStyle = grp.color;
          ctx.globalAlpha = isDark ? 0.48 : 0.38;
          ctx.lineWidth = 1.15;
          ctx.beginPath();
          const spacing = 10;
          const diagStep = 2;
          for (let d = 0; d < w + h; d += spacing) {
            const tStart = Math.max(0, d - w);
            const tEnd = Math.min(h, d);
            let drawingSeg = false;
            for (let t = tStart; t <= tEnd; t += diagStep) {
              const px = d - t;
              const py = t;
              if (inRegion(px, py)) {
                if (!drawingSeg) {
                  ctx.moveTo(px, py);
                  drawingSeg = true;
                } else {
                  ctx.lineTo(px, py);
                }
              } else if (drawingSeg) {
                drawingSeg = false;
              }
            }
          }
          ctx.stroke();
          ctx.restore();
        });
      }

      // 3. 座標軸 (x軸・y軸・矢印・目盛り・原点O)
      const axisX0 = Math.min(Math.max(toPxX(0), 24), w - 24);
      const axisY0 = Math.min(Math.max(toPxY(0), 20), h - 24);

      ctx.strokeStyle = axisCol;
      ctx.fillStyle = axisCol;
      ctx.lineWidth = 1.6;

      // x軸
      ctx.beginPath();
      ctx.moveTo(0, axisY0);
      ctx.lineTo(w - 2, axisY0);
      ctx.stroke();
      // x軸矢印
      ctx.beginPath();
      ctx.moveTo(w - 1, axisY0);
      ctx.lineTo(w - 9, axisY0 - 4);
      ctx.lineTo(w - 9, axisY0 + 4);
      ctx.closePath();
      ctx.fill();

      // y軸
      ctx.beginPath();
      ctx.moveTo(axisX0, h);
      ctx.lineTo(axisX0, 2);
      ctx.stroke();
      // y軸矢印
      ctx.beginPath();
      ctx.moveTo(axisX0, 1);
      ctx.lineTo(axisX0 - 4, 9);
      ctx.lineTo(axisX0 + 4, 9);
      ctx.closePath();
      ctx.fill();

      // 目盛り数値と軸ラベル
      ctx.fillStyle = textCol;
      ctx.font = '11px "JetBrains Mono", "Noto Sans JP", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      for (let gx = Math.ceil(view.xmin / xStep) * xStep; gx <= view.xmax; gx += xStep) {
        if (Math.abs(gx) < xStep * 1e-4) continue;
        const px = toPxX(gx);
        if (px < 18 || px > w - 22) continue;
        ctx.fillText(this.formatTickNumber(gx, xStep), px, Math.min(axisY0 + 5, h - 16));
      }

      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (let gy = Math.ceil(view.ymin / yStep) * yStep; gy <= view.ymax; gy += yStep) {
        if (Math.abs(gy) < yStep * 1e-4) continue;
        const py = toPxY(gy);
        if (py < 16 || py > h - 16) continue;
        ctx.fillText(this.formatTickNumber(gy, yStep), Math.max(axisX0 - 6, 26), py);
      }

      // 原点 O と x, y ラベル
      ctx.font = 'italic 600 13px "Inter", serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      if (toPxX(0) >= 12 && toPxX(0) <= w - 12 && toPxY(0) >= 12 && toPxY(0) <= h - 12) {
        ctx.fillText('O', axisX0 - 5, axisY0 + 4);
      }
      ctx.fillText('x', w - 6, axisY0 - 18);
      ctx.textAlign = 'left';
      ctx.fillText('y', axisX0 + 8, 6);

      // 4. 曲線・関数のプロット
      const samples = Math.min(Math.max(Math.round(w * 1.5), 600), 1200);
      const ySpan = view.ymax - view.ymin;

      spec.curves.forEach(curve => {
        ctx.save();
        ctx.strokeStyle = curve.color;
        ctx.lineWidth = 2.4;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        if (curve.dashed) ctx.setLineDash([7, 5]);
        else if (curve.dotted) ctx.setLineDash([2.5, 4]);

        ctx.beginPath();
        let drawing = false;
        let prevY = null;

        if (curve.type === 'y') {
          const cMin = curve.subDomain ? Math.max(view.xmin, curve.subDomain[0]) : view.xmin;
          const cMax = curve.subDomain ? Math.min(view.xmax, curve.subDomain[1]) : view.xmax;
          if (cMin < cMax) {
            for (let k = 0; k <= samples; k++) {
              const x = cMin + (k / samples) * (cMax - cMin);
              const y = curve.fn(x);
              if (!Number.isFinite(y) || y < view.ymin - ySpan * 4 || y > view.ymax + ySpan * 4) {
                drawing = false;
                prevY = null;
                continue;
              }
              // 漸近線（不連続ジャンプ）の検出
              if (prevY !== null && Math.abs(y - prevY) > ySpan * 1.6) {
                drawing = false;
              }
              const px = toPxX(x);
              const py = toPxY(y);
              if (!drawing) {
                ctx.moveTo(px, py);
                drawing = true;
              } else {
                ctx.lineTo(px, py);
              }
              prevY = y;
            }
          }
        } else if (curve.type === 'x') {
          for (let k = 0; k <= samples; k++) {
            const y = view.ymin + (k / samples) * (view.ymax - view.ymin);
            const x = curve.fn(y);
            if (!Number.isFinite(x)) { drawing = false; continue; }
            const px = toPxX(x);
            const py = toPxY(y);
            if (!drawing) { ctx.moveTo(px, py); drawing = true; }
            else { ctx.lineTo(px, py); }
          }
        } else if (curve.type === 'param') {
          for (let k = 0; k <= samples; k++) {
            const t = curve.tMin + (k / samples) * (curve.tMax - curve.tMin);
            const x = curve.fx(t);
            const y = curve.fy(t);
            if (!Number.isFinite(x) || !Number.isFinite(y)) { drawing = false; continue; }
            const px = toPxX(x);
            const py = toPxY(y);
            if (!drawing) { ctx.moveTo(px, py); drawing = true; }
            else { ctx.lineTo(px, py); }
          }
        } else if (curve.type === 'implicit') {
          const polylines = this.traceImplicitContourPolylines(curve.fn2d, view, w, h);
          polylines.forEach(chain => {
            if (chain.length < 2) return;
            ctx.moveTo(chain[0].x, chain[0].y);
            for (let k = 1; k < chain.length; k++) {
              ctx.lineTo(chain[k].x, chain[k].y);
            }
          });
        }
        ctx.stroke();
        ctx.restore();
      });

      // 5. 特徴点 (極大・極小・交点・座標ガイド点線)
      spec.points.forEach(pt => {
        const px = toPxX(pt.x);
        const py = toPxY(pt.y);
        if (px < -20 || px > w + 20 || py < -20 || py > h + 20) return;

        // 座標軸への点線ガイド
        if (pt.guide) {
          ctx.save();
          ctx.strokeStyle = pt.color;
          ctx.globalAlpha = 0.45;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          if (Math.abs(pt.y) > 1e-6) {
            ctx.moveTo(px, py);
            ctx.lineTo(px, toPxY(0));
          }
          if (Math.abs(pt.x) > 1e-6) {
            ctx.moveTo(px, py);
            ctx.lineTo(toPxX(0), py);
          }
          ctx.stroke();
          ctx.restore();
        }

        // 点マーカー
        ctx.save();
        ctx.fillStyle = bgCol;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(px, py, 4.2, 0, 2 * Math.PI);
        ctx.fill();

        // 点ラベル
        if (pt.label) {
          ctx.font = '600 11.5px "Noto Sans JP", "Inter", sans-serif';
          const textW = ctx.measureText(pt.label).width;
          const offsetY = py < 36 ? 15 : -13;
          const boxX = Math.min(Math.max(px - textW / 2 - 5, 4), w - textW - 14);
          const boxY = py + offsetY - 9;

          ctx.fillStyle = isDark ? 'rgba(19, 27, 46, 0.88)' : 'rgba(255, 255, 255, 0.90)';
          ctx.strokeStyle = pt.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, textW + 10, 18, 4);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = textCol;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(pt.label, boxX + 5, boxY + 9);
        }
        ctx.restore();
      });

      // 6. マウスホバー時のクロスヘア＆曲線上のスナップ点表示
      if (hoverState) {
        const hx = toMathX(hoverState.px);
        const hy = toMathY(hoverState.py);

        ctx.save();
        ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.35)' : 'rgba(100, 116, 139, 0.35)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(hoverState.px, 0);
        ctx.lineTo(hoverState.px, h);
        ctx.moveTo(0, hoverState.py);
        ctx.lineTo(w, hoverState.py);
        ctx.stroke();

        // 最も近い y = f(x) 曲線上の点をハイライト
        let bestCurve = null;
        let bestY = null;
        let bestDist = 28;
        spec.curves.forEach(c => {
          if (c.type === 'y') {
            if (c.subDomain && (hx < c.subDomain[0] || hx > c.subDomain[1])) return;
            const cy = c.fn(hx);
            if (Number.isFinite(cy)) {
              const cpy = toPxY(cy);
              const dist = Math.abs(cpy - hoverState.py);
              if (dist < bestDist) {
                bestDist = dist;
                bestCurve = c;
                bestY = cy;
              }
            }
          }
        });

        if (bestCurve && bestY !== null) {
          const snapPy = toPxY(bestY);
          ctx.fillStyle = bestCurve.color;
          ctx.beginPath();
          ctx.arc(hoverState.px, snapPy, 5, 0, 2 * Math.PI);
          ctx.fill();
          coordsBadge.textContent = `(x, y) = (${hx.toFixed(2)}, ${bestY.toFixed(2)})`;
        } else {
          coordsBadge.textContent = `(x, y) = (${hx.toFixed(2)}, ${hy.toFixed(2)})`;
        }
        ctx.restore();
      }

      ctx.restore();
    };

    widgetEl._redrawGraph = draw;

    // ドラッグ移動 (Pan) & ホバー座標追跡
    let isDragging = false;
    let dragStart = { x: 0, y: 0, xmin: 0, xmax: 0, ymin: 0, ymax: 0 };

    canvas.addEventListener('pointerdown', (e) => {
      isDragging = true;
      canvas.setPointerCapture(e.pointerId);
      dragStart = {
        x: e.clientX,
        y: e.clientY,
        xmin: view.xmin,
        xmax: view.xmax,
        ymin: view.ymin,
        ymax: view.ymax
      };
    });

    canvas.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        const xSpan = dragStart.xmax - dragStart.xmin;
        const ySpan = dragStart.ymax - dragStart.ymin;
        view.xmin = dragStart.xmin - (dx / rect.width) * xSpan;
        view.xmax = dragStart.xmax - (dx / rect.width) * xSpan;
        view.ymin = dragStart.ymin + (dy / rect.height) * ySpan;
        view.ymax = dragStart.ymax + (dy / rect.height) * ySpan;
      }
      hoverState = { px, py };
      draw();
    });

    const endDrag = () => { isDragging = false; };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('pointerleave', () => {
      isDragging = false;
      hoverState = null;
      coordsBadge.textContent = '(x, y) = (-, -)';
      draw();
    });

    // ホイールでのズーム
    const zoomBy = (factor) => {
      const xCenter = (view.xmin + view.xmax) / 2;
      const yCenter = (view.ymin + view.ymax) / 2;
      const xHalf = ((view.xmax - view.xmin) / 2) * factor;
      const yHalf = ((view.ymax - view.ymin) / 2) * factor;
      if (xHalf > 1e-4 && xHalf < 1e5) {
        view.xmin = xCenter - xHalf;
        view.xmax = xCenter + xHalf;
        view.ymin = yCenter - yHalf;
        view.ymax = yCenter + yHalf;
        draw();
      }
    };

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      zoomBy(e.deltaY > 0 ? 1.15 : 0.87);
    }, { passive: false });

    // ツールバーボタン操作
    widgetEl.querySelectorAll('.graph-ctrl-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const act = btn.getAttribute('data-act');
        if (act === 'zoom-in') zoomBy(0.8);
        else if (act === 'zoom-out') zoomBy(1.25);
        else if (act === 'reset') {
          Object.assign(view, initView);
          draw();
        } else if (act === 'download') {
          const link = document.createElement('a');
          link.download = `${(spec.title || 'math-graph').replace(/\s+/g, '_')}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      });
    });

    // アコーディオン展開時やウィンドウリサイズ時に自動で鮮明に再描画
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => draw());
      ro.observe(widgetEl);
    }
    requestAnimationFrame(() => draw());
  }

  bindEditorPreview(textareaId, previewId) {
    const textarea = document.getElementById(textareaId);
    const preview = document.getElementById(previewId);

    const update = () => {
      this.renderMarkdownAndKaTeX(textarea.value, preview);
    };

    textarea.addEventListener('input', () => {
      clearTimeout(this.debounceTimers[textareaId]);
      this.debounceTimers[textareaId] = setTimeout(update, 150);
    });
  }

  insertMathSnippet(snippet) {
    // 現在アクティブな（あるいは最後の）textareaに挿入
    let target = document.activeElement;
    if (!target || target.tagName !== 'TEXTAREA') {
      target = document.getElementById('form-problem');
    }
    const start = target.selectionStart || 0;
    const end = target.selectionEnd || 0;
    const val = target.value;
    target.value = val.substring(0, start) + snippet + val.substring(end);
    target.selectionStart = target.selectionEnd = start + snippet.length;
    target.focus();
    target.dispatchEvent(new Event('input'));
  }

  // --------------------------------------------------------
  // 閲覧モードの描画 (問題一覧、カテゴリ、統計)
  // --------------------------------------------------------
  render() {
    this.updateCategoryFilter();
    this.renderTagCloud();
    this.renderQuestionList();
    this.updateStats();
  }

  updateCategoryFilter() {
    const select = document.getElementById('filter-category');
    const currentVal = select.value;
    const categories = Array.from(new Set(this.questions.map(q => q.category).filter(Boolean))).sort();

    select.innerHTML = '<option value="all">すべてのカテゴリ</option>';
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      select.appendChild(opt);
    });

    if (categories.includes(currentVal)) {
      select.value = currentVal;
    }
  }

  renderTagCloud() {
    const cloudEl = document.getElementById('tag-cloud');
    const container = document.getElementById('tag-cloud-container');
    const allTags = new Set();
    this.questions.forEach(q => {
      (q.tags || []).forEach(t => allTags.add(t.trim()));
    });

    const tagsArray = Array.from(allTags).filter(Boolean).sort();
    if (tagsArray.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'flex';
    cloudEl.innerHTML = '';

    tagsArray.forEach(tag => {
      const pill = document.createElement('span');
      pill.className = `tag-pill ${this.activeTag === tag ? 'active' : ''}`;
      pill.textContent = `#${tag}`;
      pill.addEventListener('click', () => {
        this.activeTag = (this.activeTag === tag) ? null : tag;
        this.renderTagCloud();
        this.renderQuestionList();
      });
      cloudEl.appendChild(pill);
    });
  }

  getFilteredQuestions() {
    const searchVal = document.getElementById('global-search').value.toLowerCase().trim();
    const catVal = document.getElementById('filter-category').value;
    const diffVal = document.getElementById('filter-difficulty').value;
    const statusVal = document.getElementById('filter-status').value;
    const sortVal = document.getElementById('sort-order').value;

    return this.questions.filter(q => {
      // 検索フィルタ
      if (searchVal) {
        const titleMatch = (q.title || '').toLowerCase().includes(searchVal);
        const probMatch = (q.problem || '').toLowerCase().includes(searchVal);
        const solMatch = (q.solution || '').toLowerCase().includes(searchVal);
        const tagMatch = (q.tags || []).some(t => t.toLowerCase().includes(searchVal));
        if (!titleMatch && !probMatch && !solMatch && !tagMatch) return false;
      }

      // カテゴリ
      if (catVal !== 'all' && q.category !== catVal) return false;

      // 難易度
      if (diffVal !== 'all' && String(q.difficulty) !== diffVal) return false;

      // タグ
      if (this.activeTag && !(q.tags || []).includes(this.activeTag)) return false;

      // ステータス
      const currentStatus = this.statusMap[q.id] || 'unlearned';
      if (statusVal === 'unlearned' && currentStatus !== 'unlearned') return false;
      if (statusVal === 'review' && currentStatus !== 'review') return false;
      if (statusVal === 'mastered' && currentStatus !== 'mastered') return false;

      return true;
    }).sort((a, b) => {
      if (sortVal === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (sortVal === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      if (sortVal === 'diff-desc') return (b.difficulty || 1) - (a.difficulty || 1);
      if (sortVal === 'diff-asc') return (a.difficulty || 1) - (b.difficulty || 1);
      return 0;
    });
  }

  renderQuestionList() {
    const container = document.getElementById('questions-list');
    const emptyState = document.getElementById('empty-state');
    const countEl = document.getElementById('result-count');
    const filtered = this.getFilteredQuestions();

    countEl.textContent = `${filtered.length} 問を表示中`;

    if (filtered.length === 0) {
      container.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    container.innerHTML = '';

    filtered.forEach(q => {
      const card = this.createIndexCard(q);
      container.appendChild(card);
    });

    this.refreshIcons();
  }

  // 一覧ページ用のコンパクトカード作成
  createIndexCard(q) {
    const card = document.createElement('div');
    card.className = 'index-card';

    const stars = '★'.repeat(q.difficulty || 1) + '☆'.repeat(5 - (q.difficulty || 1));
    const currentStatus = this.statusMap[q.id] || 'unlearned';
    const statusLabels = {
      mastered: '〇 マスター',
      review: '△ 要復習',
      unlearned: '未着手'
    };

    card.innerHTML = `
      <div>
        <div class="index-card-top">
          <div class="index-card-meta">
            <span class="category-badge">${this.escapeHtml(q.category || '一般')}</span>
            <span class="difficulty-stars" title="難易度: ${q.difficulty}">${stars}</span>
          </div>
          <span class="status-pill ${currentStatus}">${statusLabels[currentStatus]}</span>
        </div>
        <h3 class="index-card-title">${this.escapeHtml(q.title)}</h3>
      </div>

      <div class="index-card-preview math-render-target"></div>

      <div class="index-card-footer">
        <div class="index-card-tags">
          ${(q.tags || []).slice(0, 4).map(t => `<span class="index-tag">#${this.escapeHtml(t)}</span>`).join('')}
        </div>
        <span class="index-open-link">
          問題を解く <i data-lucide="arrow-right"></i>
        </span>
      </div>
    `;

    const previewEl = card.querySelector('.index-card-preview');
    this.renderMarkdownAndKaTeX(q.problem, previewEl);

    card.addEventListener('click', () => {
      this.navigateTo('detail', q.id);
    });

    return card;
  }

  // 単問閲覧ページを開く
  openQuestionDetail(id, updateHash = true) {
    const q = this.questions.find(item => item.id === id);
    if (!q) {
      this.showToast('指定された問題が見つかりませんでした');
      this.navigateTo('view');
      return;
    }

    this.currentQuestionId = id;
    if (updateHash) {
      this.navigateTo('detail', id);
      return;
    }

    this.setMode('detail', false);

    // 単問カードを描画
    const container = document.getElementById('detail-question-container');
    container.innerHTML = '';
    const detailCard = this.createQuestionCard(q, true);
    container.appendChild(detailCard);

    // 現在のフィルターリスト（または全問題リスト）内での前後関係を計算
    let list = this.getFilteredQuestions();
    let idx = list.findIndex(item => item.id === id);
    if (idx === -1) {
      list = this.questions;
      idx = list.findIndex(item => item.id === id);
    }

    // 位置インジケーター
    const posBadge = document.getElementById('detail-position-indicator');
    if (posBadge) {
      posBadge.textContent = `${idx + 1} / ${list.length} 問目`;
    }

    // 前後の問題ボタンの設定
    const prevBtn = document.getElementById('btn-prev-question');
    const nextBtn = document.getElementById('btn-next-question');
    const prevTitle = document.getElementById('prev-q-title');
    const nextTitle = document.getElementById('next-q-title');

    if (prevBtn && prevTitle) {
      if (idx > 0) {
        const prevQ = list[idx - 1];
        prevBtn.disabled = false;
        prevTitle.textContent = prevQ.title;
        prevBtn.onclick = () => this.navigateTo('detail', prevQ.id);
      } else {
        prevBtn.disabled = true;
        prevTitle.textContent = '（最初の問題です）';
        prevBtn.onclick = null;
      }
    }

    if (nextBtn && nextTitle) {
      if (idx >= 0 && idx < list.length - 1) {
        const nextQ = list[idx + 1];
        nextBtn.disabled = false;
        nextTitle.textContent = nextQ.title;
        nextBtn.onclick = () => this.navigateTo('detail', nextQ.id);
      } else {
        nextBtn.disabled = true;
        nextTitle.textContent = '（最後の問題です）';
        nextBtn.onclick = null;
      }
    }

    this.refreshIcons();
  }

  openRandomQuestionPage() {
    if (this.questions.length === 0) {
      this.showToast('問題が登録されていません');
      return;
    }
    let pool = this.questions;
    if (this.questions.length > 1 && this.currentQuestionId) {
      pool = this.questions.filter(q => q.id !== this.currentQuestionId);
    }
    const randomQ = pool[Math.floor(Math.random() * pool.length)];
    this.navigateTo('detail', randomQ.id);
  }

  createQuestionCard(q, isModal = false) {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `card-${q.id}`;

    const stars = '★'.repeat(q.difficulty || 1) + '☆'.repeat(5 - (q.difficulty || 1));
    const currentStatus = this.statusMap[q.id] || 'unlearned';

    card.innerHTML = `
      <div class="card-header">
        <div class="card-title-group">
          <div class="card-badges">
            <span class="category-badge">${this.escapeHtml(q.category || '一般')}</span>
            <span class="difficulty-stars" title="難易度: ${q.difficulty}">${stars}</span>
            ${(q.tags || []).map(t => `<span class="tag-pill">#${this.escapeHtml(t)}</span>`).join('')}
          </div>
          <h2 class="card-title">${this.escapeHtml(q.title)}</h2>
        </div>
        ${!isModal ? `
        <div class="card-meta-actions">
          <button class="btn btn-sm btn-subtle btn-card-edit" title="この問題を編集">
            <i data-lucide="edit-2"></i> 編集
          </button>
        </div>` : ''}
      </div>

      <div class="card-body">
        <div class="problem-box">
          <div class="problem-label"><i data-lucide="help-circle"></i> 問題</div>
          <div class="problem-content math-render-target"></div>
        </div>

        ${q.hint ? `
        <div class="hint-accordion">
          <div class="hint-header">
            <span><i data-lucide="lightbulb"></i> ヒント・着眼点を表示</span>
            <i data-lucide="chevron-down" class="hint-arrow"></i>
          </div>
          <div class="hint-content math-render-target"></div>
        </div>` : ''}
      </div>

      <div class="card-actions-bar">
        <button class="btn-toggle-solution">
          <i data-lucide="eye" class="sol-icon"></i>
          <span class="sol-btn-text">模範解答を見る</span>
        </button>
      </div>

      <div class="solution-container">
        <div class="solution-body">
          <div class="solution-main math-render-target"></div>
          ${q.alternative ? `
          <div class="alternative-box">
            <div class="alternative-content math-render-target"></div>
          </div>` : ''}
        </div>
      </div>

      <div class="card-footer">
        <div class="status-buttons">
          <span class="status-label">理解度:</span>
          <button class="btn-status ${currentStatus === 'mastered' ? 'active' : ''}" data-status="mastered">
            〇 マスター
          </button>
          <button class="btn-status ${currentStatus === 'review' ? 'active' : ''}" data-status="review">
            △ 要復習
          </button>
          <button class="btn-status ${currentStatus === 'unlearned' ? 'active' : ''}" data-status="unlearned">
            未着手
          </button>
        </div>
      </div>
    `;

    // 数式・Markdownを適用
    const probEl = card.querySelector('.problem-content');
    this.renderMarkdownAndKaTeX(q.problem, probEl);

    if (q.hint) {
      const hintEl = card.querySelector('.hint-content');
      this.renderMarkdownAndKaTeX(q.hint, hintEl);

      const hintHeader = card.querySelector('.hint-header');
      const hintAccordion = card.querySelector('.hint-accordion');
      hintHeader.addEventListener('click', () => {
        hintAccordion.classList.toggle('open');
      });
    }

    const solEl = card.querySelector('.solution-main');
    this.renderMarkdownAndKaTeX(q.solution, solEl);

    if (q.alternative) {
      const altEl = card.querySelector('.alternative-content');
      this.renderMarkdownAndKaTeX(q.alternative, altEl);
    }

    // 解答開閉トグル
    const solBtn = card.querySelector('.btn-toggle-solution');
    const solContainer = card.querySelector('.solution-container');
    const solText = card.querySelector('.sol-btn-text');
    solBtn.addEventListener('click', () => {
      const isOpen = solContainer.classList.toggle('open');
      solBtn.classList.toggle('open', isOpen);
      solText.textContent = isOpen ? '解答を隠す' : '模範解答を見る';
      const icon = solBtn.querySelector('.sol-icon');
      if (icon) icon.setAttribute('data-lucide', isOpen ? 'eye-off' : 'eye');
      this.refreshIcons();
    });

    // 理解度ボタントグル
    card.querySelectorAll('.btn-status').forEach(btn => {
      btn.addEventListener('click', () => {
        const status = btn.getAttribute('data-status');
        this.statusMap[q.id] = status;
        this.saveStatus();
        card.querySelectorAll('.btn-status').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.updateStats();
        this.showToast(`「${q.title}」のステータスを更新しました`);
      });
    });

    // 編集ボタン
    const editBtn = card.querySelector('.btn-card-edit');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        this.editQuestion(q.id);
      });
    }

    return card;
  }

  toggleAllSolutions(open) {
    document.querySelectorAll('.question-card').forEach(card => {
      const solContainer = card.querySelector('.solution-container');
      const solBtn = card.querySelector('.btn-toggle-solution');
      const solText = card.querySelector('.sol-btn-text');
      if (solContainer && solBtn) {
        solContainer.classList.toggle('open', open);
        solBtn.classList.toggle('open', open);
        if (solText) solText.textContent = open ? '解答を隠す' : '模範解答を見る';
        const icon = solBtn.querySelector('.sol-icon');
        if (icon) icon.setAttribute('data-lucide', open ? 'eye-off' : 'eye');
      }
    });
    this.refreshIcons();
  }

  updateStats() {
    const total = this.questions.length;
    let mastered = 0;
    let review = 0;
    let unlearned = 0;

    this.questions.forEach(q => {
      const st = this.statusMap[q.id] || 'unlearned';
      if (st === 'mastered') mastered++;
      else if (st === 'review') review++;
      else unlearned++;
    });

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-mastered').textContent = mastered;
    document.getElementById('stat-review').textContent = review;
    document.getElementById('stat-unlearned').textContent = unlearned;
  }

  // --------------------------------------------------------
  // ランダム出題モーダル
  // --------------------------------------------------------
  showRandomQuestion() {
    if (this.questions.length === 0) {
      this.showToast('問題が登録されていません');
      return;
    }

    const randomIndex = Math.floor(Math.random() * this.questions.length);
    const q = this.questions[randomIndex];

    const modalContent = document.getElementById('random-modal-content');
    modalContent.innerHTML = '';
    const card = this.createQuestionCard(q, true);
    modalContent.appendChild(card);

    document.getElementById('random-modal').classList.add('active');
    this.refreshIcons();
  }

  closeRandomModal() {
    document.getElementById('random-modal').classList.remove('active');
  }

  // --------------------------------------------------------
  // 管理モード: 問題作成 & 編集
  // --------------------------------------------------------
  editQuestion(id) {
    const q = this.questions.find(item => item.id === id);
    if (!q) return;

    this.editingId = id;
    document.getElementById('form-id').value = q.id;
    document.getElementById('form-title').value = q.title || '';
    document.getElementById('form-category').value = q.category || '';
    document.getElementById('form-difficulty').value = q.difficulty || 3;
    document.getElementById('form-tags').value = (q.tags || []).join(', ');
    document.getElementById('form-problem').value = q.problem || '';
    document.getElementById('form-hint').value = q.hint || '';
    document.getElementById('form-solution').value = q.solution || '';
    document.getElementById('form-alternative').value = q.alternative || '';

    document.getElementById('form-tab-title').textContent = '問題を編集';
    document.getElementById('save-btn-text').textContent = '変更を保存';

    // プレビューを即座に更新
    ['problem', 'hint', 'solution', 'alternative'].forEach(field => {
      const textarea = document.getElementById(`form-${field}`);
      const preview = document.getElementById(`preview-${field}`);
      this.renderMarkdownAndKaTeX(textarea.value, preview);
    });

    this.setMode('admin');
    this.setAdminTab('editor');
  }

  resetForm() {
    this.editingId = null;
    document.getElementById('question-form').reset();
    document.getElementById('form-id').value = '';
    document.getElementById('form-difficulty').value = 3;
    document.getElementById('form-tab-title').textContent = '新しい問題を作成';
    document.getElementById('save-btn-text').textContent = '保存して一覧に反映';

    ['problem', 'hint', 'solution', 'alternative'].forEach(field => {
      const preview = document.getElementById(`preview-${field}`);
      preview.innerHTML = '';
    });
  }

  handleFormSubmit() {
    const title = document.getElementById('form-title').value.trim();
    const category = document.getElementById('form-category').value.trim() || '一般';
    const difficulty = parseInt(document.getElementById('form-difficulty').value, 10) || 3;
    const tags = document.getElementById('form-tags').value
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    const problem = document.getElementById('form-problem').value;
    const hint = document.getElementById('form-hint').value;
    const solution = document.getElementById('form-solution').value;
    const alternative = document.getElementById('form-alternative').value;

    if (!title || !problem || !solution) {
      alert('タイトル、問題文、模範解答は必須項目です。');
      return;
    }

    const now = new Date().toISOString();
    let targetId = this.editingId;

    if (this.editingId) {
      // 既存の更新
      const index = this.questions.findIndex(q => q.id === this.editingId);
      if (index !== -1) {
        this.questions[index] = {
          ...this.questions[index],
          title,
          category,
          difficulty,
          tags,
          problem,
          hint,
          solution,
          alternative,
          updatedAt: now
        };
        this.showToast(`問題「${title}」を更新しました`);
      }
    } else {
      // 新規作成
      targetId = 'q-' + Date.now();
      const newQuestion = {
        id: targetId,
        title,
        category,
        difficulty,
        tags,
        problem,
        hint,
        solution,
        alternative,
        createdAt: now,
        updatedAt: now
      };
      this.questions.unshift(newQuestion);
      this.showToast(`新しい問題「${title}」を登録しました`);
    }

    this.saveQuestions(true);
    this.resetForm();
    this.navigateTo('detail', targetId);
  }

  // --------------------------------------------------------
  // 管理モード: 問題一覧テーブル
  // --------------------------------------------------------
  renderAdminTable() {
    const tbody = document.getElementById('manage-table-body');
    tbody.innerHTML = '';

    this.questions.forEach((q, idx) => {
      const tr = document.createElement('tr');
      const stars = '★'.repeat(q.difficulty || 1);
      const dateStr = q.updatedAt ? new Date(q.updatedAt).toLocaleDateString('ja-JP') : '-';

      tr.innerHTML = `
        <td><strong>${this.escapeHtml(q.title)}</strong></td>
        <td><span class="category-badge">${this.escapeHtml(q.category || '-')}</span></td>
        <td style="color:#f59e0b">${stars}</td>
        <td style="color:var(--text-muted); font-size:0.8rem;">${dateStr}</td>
        <td>
          <div style="display:flex; gap:0.4rem;">
            <button class="btn btn-sm btn-primary btn-admin-view" data-id="${q.id}">閲覧</button>
            <button class="btn btn-sm btn-secondary btn-admin-edit" data-id="${q.id}">編集</button>
            <button class="btn btn-sm btn-subtle btn-admin-clone" data-id="${q.id}">複製</button>
            <button class="btn btn-sm btn-danger btn-admin-del" data-id="${q.id}">削除</button>
          </div>
        </td>
      `;

      tr.querySelector('.btn-admin-view').addEventListener('click', () => this.navigateTo('detail', q.id));
      tr.querySelector('.btn-admin-edit').addEventListener('click', () => this.editQuestion(q.id));
      tr.querySelector('.btn-admin-clone').addEventListener('click', () => this.cloneQuestion(q.id));
      tr.querySelector('.btn-admin-del').addEventListener('click', () => this.deleteQuestion(q.id));

      tbody.appendChild(tr);
    });
  }

  updateAdminCount() {
    document.getElementById('admin-list-count').textContent = this.questions.length;
  }

  cloneQuestion(id) {
    const target = this.questions.find(q => q.id === id);
    if (!target) return;

    const cloned = {
      ...target,
      id: 'q-' + Date.now(),
      title: `${target.title} (コピー)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.questions.unshift(cloned);
    this.saveQuestions(true);
    this.renderAdminTable();
    this.updateAdminCount();
    this.showToast('問題を複製しました');
  }

  deleteQuestion(id) {
    const target = this.questions.find(q => q.id === id);
    if (!target) return;

    if (!confirm(`問題「${target.title}」を本当に削除しますか？`)) {
      return;
    }

    this.questions = this.questions.filter(q => q.id !== id);
    delete this.statusMap[id];
    this.saveQuestions(true);
    this.saveStatus();
    this.renderAdminTable();
    this.updateAdminCount();
    this.showToast('問題を削除しました');
  }

  // --------------------------------------------------------
  // GitHub API 直接連携 (自動クラウド同期)
  // --------------------------------------------------------
  loadGitHubConfig() {
    try {
      const raw = localStorage.getItem(GITHUB_CONFIG_KEY);
      this.githubConfig = raw ? JSON.parse(raw) : {
        repo: 'acky-volley/math-archive',
        branch: 'main',
        path: 'questions.json',
        token: '',
        autoSync: true
      };
    } catch (e) {
      this.githubConfig = {
        repo: 'acky-volley/math-archive',
        branch: 'main',
        path: 'questions.json',
        token: '',
        autoSync: true
      };
    }

    const repoEl = document.getElementById('gh-repo');
    const branchEl = document.getElementById('gh-branch');
    const pathEl = document.getElementById('gh-path');
    const tokenEl = document.getElementById('gh-token');
    const autoSyncEl = document.getElementById('gh-auto-sync');

    if (repoEl) repoEl.value = this.githubConfig.repo || '';
    if (branchEl) branchEl.value = this.githubConfig.branch || 'main';
    if (pathEl) pathEl.value = this.githubConfig.path || 'questions.json';
    if (tokenEl) tokenEl.value = this.githubConfig.token || '';
    if (autoSyncEl) autoSyncEl.checked = this.githubConfig.autoSync !== false;

    this.updateGitHubBadge();
  }

  saveGitHubConfig() {
    const repo = document.getElementById('gh-repo')?.value.trim() || '';
    const branch = document.getElementById('gh-branch')?.value.trim() || 'main';
    const path = document.getElementById('gh-path')?.value.trim().replace(/^\/+/, '') || 'questions.json';
    const token = document.getElementById('gh-token')?.value.trim() || '';
    const autoSync = document.getElementById('gh-auto-sync')?.checked !== false;

    this.githubConfig = { repo, branch, path, token, autoSync };
    localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(this.githubConfig));
    this.updateGitHubBadge();
    this.showToast('GitHub連携設定を保存しました');
  }

  updateGitHubBadge() {
    const badge = document.getElementById('github-sync-status');
    if (!badge) return;
    if (this.githubConfig?.repo && this.githubConfig?.token) {
      badge.textContent = `連携済み (${this.githubConfig.repo})`;
      badge.classList.add('connected');
    } else {
      badge.textContent = '未設定';
      badge.classList.remove('connected');
    }
  }

  async pushToGitHub(silent = false) {
    this.saveGitHubConfig();
    const { repo, branch, path, token } = this.githubConfig;

    if (!repo || !token) {
      if (!silent) {
        alert('GitHubリポジトリ名（例: acky-volley/math-archive）と Personal Access Token を入力してください。');
      }
      return;
    }

    const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    try {
      if (!silent) this.showToast('GitHubへ同期中...');

      // 1. 既存ファイルの SHA を取得
      let sha = undefined;
      const getRes = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}`, { headers });
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }

      // 2. UTF-8 文字列を Base64 に変換して PUT
      const jsonStr = JSON.stringify(this.questions, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(jsonStr)));

      const body = {
        message: `Update ${path} (${this.questions.length} questions) via MathArchive`,
        content: base64Content,
        branch
      };
      if (sha) body.sha = sha;

      const putRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!putRes.ok) {
        const errData = await putRes.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP ${putRes.status}`);
      }

      this.showToast('☁️ GitHubリポジトリへ同期（保存）しました！');
    } catch (err) {
      console.error('GitHub Sync Error:', err);
      if (!silent) {
        alert(`GitHubへの同期に失敗しました:\n${err.message}\n\nリポジトリ名・ブランチ名・トークンの権限(repo / contents:write)をご確認ください。`);
      } else {
        this.showToast(`⚠️ GitHub自動同期失敗: ${err.message}`);
      }
    }
  }

  async pullFromGitHub() {
    this.saveGitHubConfig();
    const { repo, branch, path, token } = this.githubConfig;

    if (!repo) {
      alert('GitHubリポジトリ名を入力してください。');
      return;
    }

    const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`;
    const headers = {
      'Accept': 'application/vnd.github+json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      this.showToast('GitHubから最新データを取得中...');
      const res = await fetch(apiUrl, { headers });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} (ファイルが見つからないか権限がありません)`);
      }

      const data = await res.json();
      const decodedStr = decodeURIComponent(escape(atob(data.content.replace(/\s/g, ''))));
      const remoteQuestions = JSON.parse(decodedStr);

      if (Array.isArray(remoteQuestions)) {
        this.questions = remoteQuestions;
        this.saveQuestions(false);
        this.renderAdminTable();
        this.updateAdminCount();
        this.showToast(`☁️ GitHubから ${remoteQuestions.length} 問を読み込みました！`);
      }
    } catch (err) {
      alert(`GitHubからの取得に失敗しました:\n${err.message}`);
    }
  }

  // --------------------------------------------------------
  // データ管理・エクスポート / インポート
  // --------------------------------------------------------
  exportGitHubJson() {
    // GitHub Pages 公開用に questions.json としてダウンロード
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "questions.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    this.showToast('questions.json をダウンロードしました！');
  }

  exportBackup() {
    const backupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      questions: this.questions,
      statusMap: this.statusMap
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `math-archive-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    this.showToast('バックアップファイルを保存しました');
  }

  importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (Array.isArray(json)) {
          // 単純な questions 配列形式
          this.questions = json;
        } else if (json.questions && Array.isArray(json.questions)) {
          // バックアップ形式
          this.questions = json.questions;
          if (json.statusMap) {
            this.statusMap = json.statusMap;
            this.saveStatus();
          }
        } else {
          alert('不正なJSON形式です。');
          return;
        }

        this.saveQuestions();
        this.renderAdminTable();
        this.updateAdminCount();
        this.showToast('バックアップから正常に復元しました！');
      } catch (err) {
        alert('ファイルの読み込みに失敗しました: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  reloadSamples() {
    if (!confirm('現在のデータを破棄し、初期のサンプル問題（3問）を再読み込みしますか？')) {
      return;
    }
    this.questions = [...FALLBACK_QUESTIONS];
    this.statusMap = {};
    this.saveQuestions();
    this.saveStatus();
    this.renderAdminTable();
    this.updateAdminCount();
    this.showToast('初期サンプルを読み込みました');
  }

  resetAllData() {
    if (!confirm('本当にすべての問題データを削除しますか？この操作は元に戻せません。')) {
      return;
    }
    this.questions = [];
    this.statusMap = {};
    this.saveQuestions();
    this.saveStatus();
    this.renderAdminTable();
    this.updateAdminCount();
    this.showToast('すべてのデータを初期化しました');
  }

  // --------------------------------------------------------
  // ユーティリティ
  // --------------------------------------------------------
  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
}

// アプリケーション起動
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MathArchiveApp();
});
