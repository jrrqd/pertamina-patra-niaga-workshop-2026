(() => {
  const LANG_KEY = "patraLang";
  const GROUP_KEY = "patraGroup";
  const THEME_KEY = "patraTheme";
  const STORE_KEY = "patraPreviewStore_v3";
  const TOUR_KEY = "patraTourDone_v1";
  const NODE_W = 168;
  const NODE_H = 64;
  const CANVAS_W = 720;
  const CANVAS_H = 420;
  const DEPT_ORDER = ["mrp", "event", "mblp", "digital"];
  const TL_START = 6;
  const TL_END = 23;
  const PREVIEW = document.documentElement.dataset.preview === "1"
    || /vercel\.app$/.test(location.hostname)
    || location.search.includes("preview=1");

  const I18N = {
    id: {
      skip: "Lewati ke konten", nav_aria: "Halaman", lang_aria: "Bahasa",
      tab_overview: "Ikhtisar", tab_task: "Tugas", tab_schedule: "Jadwal agen",
      tab_org: "Struktur organisasi", tab_feedback: "Masukan ke agen", tab_docs: "Dokumentasi",
      group_sr: "Kode grup", group_aria: "Kode grup peserta", theme_aria: "Tema tampilan", theme: "Tema",
      banner: "Peserta memilih kode grup di kanan atas. Semua perubahan tersimpan sebagai draf. Isi bebas bahasa apa saja; hanya antarmuka yang diganti ID/EN.",
      preview_badge: "Preview lokal (tanpa Grokbot)",
      label_output: "Output", label_approver: "Approver",
      overview_title: "Ikhtisar semua sub-fungsi",
      overview_lead: "Lihat keempat sub-fungsi dan seluruh agen sekaligus. Klik kartu untuk pindah ke grup A sub-fungsi itu.",
      overview_depts: "Semua sub-fungsi", overview_agents: "Semua agen",
      overview_open: "Buka grup", overview_agents_n: "agen", overview_tasks_n: "tugas aktif",
      task_board_title: "Monitor tugas agen",
      task_board_lead: "Pekerjaan yang sedang dipegang agen. Teks tugas tidak diterjemahkan.",
      task_filter: "Tampilkan", loading_tasks: "Memuat tugas…", no_tasks: "Belum ada tugas.",
      th_project: "Tugas", th_owner: "Owner", th_status: "Status", th_next: "Langkah berikutnya",
      th_deadline: "Tenggat", th_updated: "Diperbarui", th_time: "Waktu (WIB)", th_days: "Hari",
      th_routine: "Routine", th_dept: "Sub-fungsi",
      schedule_title: "Jadwal agen",
      schedule_lead: "Routine otomatis per agen. Waktu WIB. Yang dijeda tidak membangunkan bot.",
      schedule_filter: "Tampilkan", schedule_filter_dept: "Sub-fungsi grup saja",
      schedule_filter_all: "Semua sub-fungsi", loading_schedule: "Memuat jadwal…", no_schedule: "Belum ada jadwal.",
      schedule_add: "+ Routine", schedule_editor_title: "Routine agen", schedule_save: "Simpan draf",
      status_active: "Aktif", status_paused: "Dijeda", th_actions: "Aksi",
      msg_schedule_saved: "Jadwal draf disimpan.", msg_schedule_deleted: "Routine dihapus dari draf.",
      confirm_delete_schedule: "Hapus routine ini dari command center?",
      tour_btn: "Tutorial", tour_aria: "Mulai tutorial command center",
      tour_skip: "Lewati", tour_prev: "Kembali", tour_next: "Lanjut", tour_done: "Selesai",
      tour_1_title: "Kode grup",
      tour_1_body: "Pilih kode grup Anda di kanan atas (mis. MRP-A). Semua draf dan antrean mengikuti grup ini.",
      tour_2_title: "Ikhtisar",
      tour_2_body: "Lihat semua sub-fungsi atau semua agen. Klik kartu untuk membuka grup A sub-fungsi itu.",
      tour_3_title: "Tugas",
      tour_3_body: "Papan tugas agen per sub-fungsi. Filter bisa diperluas ke semua sub-fungsi.",
      tour_4_title: "Jadwal agen",
      tour_4_body: "Routine otomatis. Tambah, ubah, atau jeda di sini. Preview hanya draf lokal — tidak membangunkan bot.",
      tour_5_title: "Struktur organisasi",
      tour_5_body: "Gambar peran di canvas atau kirim prompt ke CoS. Status selalu draf sampai manusia menyetujui.",
      tour_6_title: "SOP",
      tour_6_body: "CRUD draf SOP di command center. Hapus di sini tidak menghapus file di knowledge base.",
      tour_7_title: "Dokumentasi",
      tour_7_body: "Penjelasan org structure dan ringkasan SOP agen, dengan path sumber — isi SOP panjang tidak disalin.",
      tour_8_title: "Masukan ke agen",
      tour_8_body: "Kirim catatan ke CoS grup. Di preview antrean hanya lokal; di radr bisa masuk ke Grokbot.",
      org_title: "Struktur organisasi",
      org_lead: "Gambar di canvas, atau kirim prompt ke Chief of Staff. Status selalu draf. Label peran tidak diterjemahkan.",
      org_add: "+ Peran", org_save: "Simpan canvas", reload: "Muat ulang",
      org_canvas_aria: "Canvas struktur organisasi",
      org_canvas_help: "Seret kotak untuk memindahkan. Dobel-klik dua kotak untuk menghubungkan garis lapor. Klik kanan kotak untuk hapus.",
      org_edit: "Edit peran", field_id: "ID", field_role: "Nama peran", field_kind: "Jenis",
      kind_agent: "Agen", kind_human: "Manusia", field_holder: "Pemegang",
      org_save_role: "Simpan peran", delete: "Hapus",
      org_prompt_title: "Prompt ke Chief of Staff",
      org_prompt_help: "Masuk antrean grup. Teks prompt bebas bahasa.",
      field_instruction: "Instruksi", org_prompt_ph: "Contoh: tambah peran Logistik di bawah CoS Event",
      org_send: "Kirim ke CoS",
      sop_lead: "CRUD draf. Hapus tidak menghapus file KB. Judul/ringkasan tidak diterjemahkan.",
      sop_add: "+ SOP draf", sop_editor_title: "SOP draf", field_title: "Judul", field_dept: "Sub-fungsi",
      dept_all: "Semua", field_source: "Path sumber", field_summary: "Ringkasan", field_steps: "Langkah singkat",
      cancel: "Batal", sop_save: "Simpan draf",
      docs_title: "Dokumentasi", docs_updated: "Diperbarui",
      docs_for: "Untuk", docs_source: "Sumber",
      feedback_title: "Masukan ke agen",
      feedback_lead: "Preview: antrean lokal di browser. Tidak terhubung ke Grokbot. Isi catatan bebas bahasa.",
      feedback_label: "Catatan untuk Chief of Staff grup",
      feedback_ph: "Tulis arahan, koreksi, atau pertanyaan…", feedback_send: "Kirim masukan",
      queue_title: "Antrean grup",
      footer: "Workshop Fungsi Marketing · preview Vercel · data latihan fiktif · status draf.",
      no_sop: "Belum ada SOP untuk sub-fungsi ini.", no_path: "(tanpa path sumber)",
      edit: "Ubah", delete_draft: "Hapus draf", no_history: "Belum ada masukan untuk",
      msg_canvas_saved: "Canvas disimpan sebagai draf.", msg_role_deleted: "Peran dihapus dari draf.",
      msg_role_saved: "Peran disimpan sebagai draf.", msg_reloaded: "Dimuat ulang.",
      msg_sop_deleted: "Draf SOP dihapus.", msg_sop_saved: "SOP draf disimpan.",
      msg_prompt_sent: "Prompt tersimpan di antrean preview", msg_feedback_saved: "Masukan tersimpan",
      msg_pick_second: "Pilih kotak kedua (dobel-klik) untuk menghubungkan dari",
      confirm_delete_role: "Hapus peran",
      confirm_delete_sop: "Hapus draf SOP ini dari command center? File knowledge base tidak dihapus.",
      kind_human_short: "Manusia", kind_agent_short: "Agen",
      live_label: "Langsung",
      cmdk_trigger: "Cari / Pindah", cmdk_aria: "Buka pencarian dan navigasi cepat",
      cmdk_ph: "Cari grup, tab, agen, SOP…", cmdk_empty: "Tidak ada hasil.",
      kpi_agents: "Agen", kpi_approvers: "Approver manusia", kpi_tasks: "Tugas", kpi_routines: "Routine aktif",
      kpi_agents_sub: "di 4 sub-fungsi", kpi_approvers_sub: "penjaga gerbang persetujuan",
      kpi_tasks_sub: "menunggu persetujuan", kpi_routines_sub: "dijeda",
      pipeline_title: "Alur kerja lintas sub-fungsi",
      pipeline_mock: "Data mock", pipeline_mrp: "MRP", pipeline_event: "Event",
      pipeline_mblp: "MBLP", pipeline_digital: "Digital", pipeline_gate: "Persetujuan manusia",
      view_kanban: "Board Kanban", view_table: "Tabel", view_timeline: "Timeline WIB",
      kanban_draft: "Draf", kanban_running: "Berjalan", kanban_waiting: "Menunggu persetujuan", kanban_done: "Selesai",
      org_autolayout: "Rapikan otomatis", schedule_pause: "Jeda", schedule_resume: "Lanjutkan",
      open_tasks: "Buka Tugas", open_org: "Lihat Org",
    },
    en: {
      skip: "Skip to content", nav_aria: "Pages", lang_aria: "Language",
      tab_overview: "Overview", tab_task: "Tasks", tab_schedule: "Agent schedule",
      tab_org: "Org structure", tab_feedback: "Feedback to agent", tab_docs: "Docs",
      group_sr: "Group code", group_aria: "Participant group code", theme_aria: "Display theme", theme: "Theme",
      banner: "Pick your group code at the top right. Changes save as drafts. Content can be any language; only the UI chrome switches ID/EN.",
      preview_badge: "Local preview (no Grokbot)",
      label_output: "Output", label_approver: "Approver",
      overview_title: "All sub-functions overview",
      overview_lead: "See all four sub-functions and every agent. Click a card to open that sub-function's group A.",
      overview_depts: "All sub-functions", overview_agents: "All agents",
      overview_open: "Open group", overview_agents_n: "agents", overview_tasks_n: "active tasks",
      task_board_title: "Agent task monitor",
      task_board_lead: "Work currently held by agents. Task text is not translated.",
      task_filter: "Show", loading_tasks: "Loading tasks…", no_tasks: "No tasks yet.",
      th_project: "Task", th_owner: "Owner", th_status: "Status", th_next: "Next step",
      th_deadline: "Deadline", th_updated: "Updated", th_time: "Time (WIB)", th_days: "Days",
      th_routine: "Routine", th_dept: "Sub-function",
      schedule_title: "Agent schedule",
      schedule_lead: "Automated agent routines. Times in WIB. Paused items do not wake bots.",
      schedule_filter: "Show", schedule_filter_dept: "This group's sub-function only",
      schedule_filter_all: "All sub-functions", loading_schedule: "Loading schedule…", no_schedule: "No schedules yet.",
      schedule_add: "+ Routine", schedule_editor_title: "Agent routine", schedule_save: "Save draft",
      status_active: "Active", status_paused: "Paused", th_actions: "Actions",
      msg_schedule_saved: "Draft schedule saved.", msg_schedule_deleted: "Routine removed from draft.",
      confirm_delete_schedule: "Delete this routine from the command center?",
      tour_btn: "Tutorial", tour_aria: "Start command center tutorial",
      tour_skip: "Skip", tour_prev: "Back", tour_next: "Next", tour_done: "Done",
      tour_1_title: "Group code",
      tour_1_body: "Pick your group at the top right (e.g. MRP-A). Drafts and the queue follow this group.",
      tour_2_title: "Overview",
      tour_2_body: "See all sub-functions or every agent. Click a card to open that sub-function's group A.",
      tour_3_title: "Tasks",
      tour_3_body: "Agent task board per sub-function. Expand the filter to see all sub-functions.",
      tour_4_title: "Agent schedule",
      tour_4_body: "Automated routines. Add, edit, or pause here. Preview is local draft only — it does not wake bots.",
      tour_5_title: "Org structure",
      tour_5_body: "Draw roles on the canvas or prompt the CoS. Always draft until a human approves.",
      tour_6_title: "SOP",
      tour_6_body: "Draft SOP CRUD in the command center. Deleting here does not remove knowledge-base files.",
      tour_7_title: "Docs",
      tour_7_body: "Org structure and short agent SOP notes with source paths — long SOP text is not copied.",
      tour_8_title: "Feedback to agent",
      tour_8_body: "Send a note to the group's CoS. In preview the queue is local only; on radr it can reach Grokbot.",
      org_title: "Org structure",
      org_lead: "Draw on the canvas, or prompt the Chief of Staff. Always draft. Role labels are not translated.",
      org_add: "+ Role", org_save: "Save canvas", reload: "Reload",
      org_canvas_aria: "Org structure canvas",
      org_canvas_help: "Drag boxes to move. Double-click two boxes to link. Right-click to delete.",
      org_edit: "Edit role", field_id: "ID", field_role: "Role name", field_kind: "Type",
      kind_agent: "Agent", kind_human: "Human", field_holder: "Holder",
      org_save_role: "Save role", delete: "Delete",
      org_prompt_title: "Prompt to Chief of Staff",
      org_prompt_help: "Goes to this group's queue. Prompt text can be any language.",
      field_instruction: "Instruction", org_prompt_ph: "Example: add a Logistics role under CoS Event",
      org_send: "Send to CoS",
      sop_lead: "Draft CRUD. Delete does not remove KB files. Titles/summaries are not translated.",
      sop_add: "+ Draft SOP", sop_editor_title: "Draft SOP", field_title: "Title", field_dept: "Sub-function",
      dept_all: "All", field_source: "Source path", field_summary: "Summary", field_steps: "Short steps",
      cancel: "Cancel", sop_save: "Save draft",
      docs_title: "Documentation", docs_updated: "Updated",
      docs_for: "For", docs_source: "Source",
      feedback_title: "Feedback to agent",
      feedback_lead: "Preview: local browser queue. Not connected to Grokbot. Notes can be any language.",
      feedback_label: "Note for the group's Chief of Staff",
      feedback_ph: "Write a direction, correction, or question…", feedback_send: "Send feedback",
      queue_title: "Group queue",
      footer: "Marketing Function workshop · Vercel preview · fictional training data · draft status.",
      no_sop: "No SOPs for this sub-function yet.", no_path: "(no source path)",
      edit: "Edit", delete_draft: "Delete draft", no_history: "No feedback yet for",
      msg_canvas_saved: "Canvas saved as draft.", msg_role_deleted: "Role removed from draft.",
      msg_role_saved: "Role saved as draft.", msg_reloaded: "Reloaded.",
      msg_sop_deleted: "Draft SOP deleted.", msg_sop_saved: "Draft SOP saved.",
      msg_prompt_sent: "Prompt saved to preview queue", msg_feedback_saved: "Feedback saved",
      msg_pick_second: "Pick the second box (double-click) to link from",
      confirm_delete_role: "Delete role",
      confirm_delete_sop: "Delete this draft SOP from the command center? Knowledge-base files are not removed.",
      kind_human_short: "Human", kind_agent_short: "Agent",
      live_label: "Live",
      cmdk_trigger: "Search / Jump", cmdk_aria: "Open quick search and navigation",
      cmdk_ph: "Search groups, tabs, agents, SOPs…", cmdk_empty: "No results.",
      kpi_agents: "Agents", kpi_approvers: "Human approvers", kpi_tasks: "Tasks", kpi_routines: "Active routines",
      kpi_agents_sub: "across 4 sub-functions", kpi_approvers_sub: "approval gatekeepers",
      kpi_tasks_sub: "awaiting approval", kpi_routines_sub: "paused",
      pipeline_title: "Cross sub-function workflow",
      pipeline_mock: "Mock data", pipeline_mrp: "MRP", pipeline_event: "Event",
      pipeline_mblp: "MBLP", pipeline_digital: "Digital", pipeline_gate: "Human approval",
      view_kanban: "Kanban board", view_table: "Table", view_timeline: "WIB timeline",
      kanban_draft: "Draft", kanban_running: "Running", kanban_waiting: "Awaiting approval", kanban_done: "Done",
      org_autolayout: "Auto layout", schedule_pause: "Pause", schedule_resume: "Resume",
      open_tasks: "Open Tasks", open_org: "View Org",
    },
  };

  const state = {
    lang: localStorage.getItem(LANG_KEY) || "id",
    group: localStorage.getItem(GROUP_KEY) || "MRP-A",
    dept: "mrp",
    graph: { nodes: [], edges: [] },
    sops: [],
    selectedId: null,
    linkFrom: null,
    drag: null,
    store: null,
    overviewMode: "depts",
    taskView: "kanban",
    scheduleView: "timeline",
    tour: { active: false, step: 0, target: null },
    cmdkIndex: 0,
    cmdkItems: [],
    canvasAnim: { raf: 0, t: 0 },
    kpiPrev: null,
  };

  const TOUR_STEPS = [
    { sel: "#group", hash: null, title: "tour_1_title", body: "tour_1_body" },
    { sel: 'a[data-tab="ikhtisar"]', hash: "#ikhtisar", title: "tour_2_title", body: "tour_2_body" },
    { sel: 'a[data-tab="tugas"]', hash: "#tugas", title: "tour_3_title", body: "tour_3_body" },
    { sel: 'a[data-tab="jadwal"]', hash: "#jadwal", title: "tour_4_title", body: "tour_4_body" },
    { sel: 'a[data-tab="org"]', hash: "#org", title: "tour_5_title", body: "tour_5_body" },
    { sel: 'a[data-tab="sop"]', hash: "#sop", title: "tour_6_title", body: "tour_6_body" },
    { sel: 'a[data-tab="docs"]', hash: "#docs", title: "tour_7_title", body: "tour_7_body" },
    { sel: 'a[data-tab="masukan"]', hash: "#masukan", title: "tour_8_title", body: "tour_8_body" },
  ];

  const TABS = [
    { hash: "ikhtisar", key: "tab_overview" },
    { hash: "tugas", key: "tab_task" },
    { hash: "jadwal", key: "tab_schedule" },
    { hash: "org", key: "tab_org" },
    { hash: "sop", label: "SOP" },
    { hash: "docs", key: "tab_docs" },
    { hash: "masukan", key: "tab_feedback" },
  ];
  const GROUPS = ["MRP-A", "MRP-B", "EVENT-A", "EVENT-B", "MBLP-A", "MBLP-B", "DIGITAL-A", "DIGITAL-B"];

  const $ = (id) => document.getElementById(id);
  const reducedMotion = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.id[key] || key;
  }
  function deptFromGroup(group) {
    return { MRP: "mrp", EVENT: "event", MBLP: "mblp", DIGITAL: "digital" }[group.split("-")[0]];
  }
  function deptLabel(dept) {
    return {
      mrp: "Market Research & Pricing",
      event: "Event Management",
      mblp: "Marketing, Brand & Loyalty",
      digital: "Digital Marketing",
    }[dept] || dept;
  }
  function groupForDept(dept) {
    return { mrp: "MRP-A", event: "EVENT-A", mblp: "MBLP-A", digital: "DIGITAL-A" }[dept];
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function nowIso() {
    const d = new Date();
    const local = new Date(d.getTime() + 7 * 60000);
    return local.toISOString().replace("Z", "+07:00").replace(/\.\d+/, "");
  }
  function statusChip(status) {
    const s = String(status || "");
    let cls = "muted";
    if (/Aktif|Berjalan|Selesai/i.test(s)) cls = "ok";
    else if (/Dijeda|Draf|Menunggu/i.test(s)) cls = /Menunggu/i.test(s) ? "wait" : "warn";
    return `<span class="chip ${cls}">${esc(s)}</span>`;
  }
  function isMac() {
    return /Mac|iPhone|iPad/i.test(navigator.platform || "");
  }
  function isDark() {
    return document.documentElement.dataset.theme === "dark"
      || (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  }

  function applyLang() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key) node.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("#lang .lang-btn").forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.dataset.lang === state.lang ? "true" : "false");
    });
    document.querySelectorAll(".cmdk-trigger kbd").forEach((k) => { k.textContent = isMac() ? "⌘K" : "Ctrl+K"; });
    const themeMode = localStorage.getItem(THEME_KEY) || "auto";
    $("theme").textContent = t("theme") + ": " + themeMode;
    if (PREVIEW) $("banner").textContent = t("banner") + " · " + t("preview_badge");
    drawCanvas();
    renderSops();
    renderTaskBoard();
    renderSchedule();
    renderOverview();
    renderDocs();
    if (state.tour.active) renderTourText();
    if ($("cmdk")?.open) renderCmdk();
  }

  async function loadSeed() {
    if (state.store) return state.store;
    const cached = localStorage.getItem(STORE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed?.org && parsed?.sops && parsed?.tasks?.depts && parsed?.schedules && parsed?.docs) {
          state.store = parsed;
          return state.store;
        }
        localStorage.removeItem(STORE_KEY);
      } catch (_) {
        localStorage.removeItem(STORE_KEY);
      }
    }
    const [org, sops, tasks, schedules, docs] = await Promise.all([
      fetch("data/org.json", { cache: "no-store" }).then((r) => r.json()),
      fetch("data/sops.json", { cache: "no-store" }).then((r) => r.json()),
      fetch("data/tasks.json", { cache: "no-store" }).then((r) => r.json()),
      fetch("data/schedules.json", { cache: "no-store" }).then((r) => r.json()),
      fetch("data/docs.json", { cache: "no-store" }).then((r) => r.json()),
    ]);
    state.store = { org, sops, tasks, schedules, docs, history: [] };
    persist();
    return state.store;
  }
  function persist() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state.store));
  }

  function previewApi(path, opts = {}) {
    const method = (opts.method || "GET").toUpperCase();
    const body = opts.body || {};
    const url = new URL(path, "http://local");
    const route = url.pathname;
    const dept = (url.searchParams.get("dept") || "").toLowerCase();
    const group = (url.searchParams.get("group") || "").toUpperCase();
    const store = state.store;

    if (route === "/health") return { ok: true, service: "patra-preview", at: nowIso() };
    if (route === "/tasks") {
      if (dept) return { dept, task: store.tasks.depts[dept], updated: store.tasks.updated };
      return store.tasks;
    }
    if (route === "/schedules" && method === "GET") {
      let items = store.schedules.items || [];
      if (dept) items = items.filter((i) => i.dept === dept);
      return { updated: store.schedules.updated, note: store.schedules.note, items };
    }
    if (route === "/schedules" && method === "POST") {
      const items = store.schedules.items || (store.schedules.items = []);
      if (body.action === "create") {
        const item = {
          id: body.id || ("sch-" + Math.random().toString(16).slice(2, 10)),
          time: body.time || "",
          days: body.days || "",
          routine: body.routine || "",
          owner: body.owner || "",
          dept: body.dept,
          status: body.status === "Dijeda" ? "Dijeda" : "Aktif",
        };
        if (!item.time || !item.days || !item.routine || !item.owner || !DEPT_ORDER.includes(item.dept)) {
          throw new Error("field jadwal tidak lengkap");
        }
        items.push(item);
        store.schedules.updated = nowIso();
        persist();
        return { ok: true, item, status: "draft" };
      }
      if (body.action === "update") {
        const item = items.find((i) => i.id === body.id);
        if (!item) throw new Error("jadwal tidak ditemukan");
        ["time", "days", "routine", "owner", "dept", "status"].forEach((k) => {
          if (body[k] !== undefined) item[k] = body[k];
        });
        if (item.status !== "Dijeda") item.status = "Aktif";
        store.schedules.updated = nowIso();
        persist();
        return { ok: true, item, status: "draft" };
      }
      if (body.action === "delete") {
        const before = items.length;
        store.schedules.items = items.filter((i) => i.id !== body.id);
        if (store.schedules.items.length === before) throw new Error("jadwal tidak ditemukan");
        store.schedules.updated = nowIso();
        persist();
        return { ok: true, deleted: body.id, status: "draft" };
      }
      throw new Error("action jadwal: create|update|delete");
    }
    if (route === "/docs") return store.docs;

    if (route === "/org" && method === "GET") {
      if (dept) return { updated: store.org.updated, status: store.org.status || "draft", dept, graph: store.org.depts[dept] };
      return store.org;
    }
    if (route === "/org" && method === "POST") {
      const d = (body.dept || "").toLowerCase();
      const graph = store.org.depts[d];
      if (!graph) throw new Error("dept tidak dikenal");
      if (body.action === "save_graph") {
        graph.nodes = body.nodes || [];
        graph.edges = body.edges || [];
      } else if (body.action === "create_node") {
        if (graph.nodes.some((n) => n.id === body.node.id)) throw new Error("id node sudah ada");
        graph.nodes.push(body.node);
      } else if (body.action === "update_node") {
        const i = graph.nodes.findIndex((n) => n.id === body.node.id);
        if (i < 0) throw new Error("node tidak ditemukan");
        graph.nodes[i] = body.node;
      } else if (body.action === "delete_node") {
        const before = graph.nodes.length;
        graph.nodes = graph.nodes.filter((n) => n.id !== body.id);
        graph.edges = graph.edges.filter((e) => e.from !== body.id && e.to !== body.id);
        if (graph.nodes.length === before) throw new Error("node tidak ditemukan");
      }
      store.org.updated = nowIso();
      store.org.status = "draft";
      persist();
      return { ok: true, dept: d, graph, status: "draft", node: body.node, deleted: body.id };
    }

    if (route === "/sops" && method === "GET") {
      let items = store.sops.items || [];
      if (dept && dept !== "all") items = items.filter((i) => i.dept === dept || i.dept === "all");
      return { updated: store.sops.updated, status: store.sops.status || "draft", items };
    }
    if (route === "/sops" && method === "POST") {
      const items = store.sops.items;
      if (body.action === "create") {
        const item = {
          id: body.id || ("sop-" + Math.random().toString(16).slice(2, 10)),
          dept: body.dept, title: body.title,
          source_path: body.source_path || "", summary: body.summary || "", steps: body.steps || "",
        };
        items.push(item);
        store.sops.updated = nowIso();
        store.sops.status = "draft";
        persist();
        return { ok: true, item, status: "draft" };
      }
      if (body.action === "update") {
        const item = items.find((i) => i.id === body.id);
        if (!item) throw new Error("sop tidak ditemukan");
        ["title", "summary", "steps", "source_path", "dept"].forEach((k) => {
          if (body[k] !== undefined) item[k] = body[k];
        });
        store.sops.updated = nowIso();
        store.sops.status = "draft";
        persist();
        return { ok: true, item, status: "draft" };
      }
      if (body.action === "delete") {
        const before = items.length;
        store.sops.items = items.filter((i) => i.id !== body.id);
        if (store.sops.items.length === before) throw new Error("sop tidak ditemukan");
        store.sops.updated = nowIso();
        store.sops.status = "draft";
        persist();
        return { ok: true, deleted: body.id, status: "draft" };
      }
    }

    if (route === "/history") {
      let items = store.history || [];
      if (group) items = items.filter((e) => e.group === group);
      items = items.slice().sort((a, b) => (b.submitted_at || "").localeCompare(a.submitted_at || ""));
      return { items: items.slice(0, 200), total: items.length };
    }
    if (route === "/respond" && method === "POST") {
      const entry = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        type: body.type || "feedback", group: body.group,
        dept: deptFromGroup(body.group), recipient: body.group,
        note: body.note, submitted_at: nowIso(), forward_status: "queued",
      };
      store.history = store.history || [];
      store.history.unshift(entry);
      persist();
      return { ok: true, entry };
    }
    throw new Error("not found");
  }

  async function api(path, opts = {}) {
    if (PREVIEW) {
      await loadSeed();
      return previewApi(path, opts);
    }
    const headers = Object.assign({ "X-Patra-Request": "1" }, opts.headers || {});
    if (opts.body) headers["Content-Type"] = "application/json";
    const res = await fetch("/patra/api" + path, {
      credentials: "same-origin", cache: "no-store", ...opts, headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || ("HTTP " + res.status));
    return data;
  }

  function setMsg(el, text, ok) {
    if (!el) return;
    el.textContent = text || "";
    el.className = "msg" + (text ? (ok ? " ok" : " err") : "");
  }

  function currentHash() {
    return (location.hash || "#ikhtisar").slice(1);
  }

  function showView() {
    const hash = currentHash();
    document.querySelectorAll(".view").forEach((v) => { v.hidden = v.dataset.view !== hash; });
    document.querySelectorAll(".tabs a").forEach((a) => { a.classList.toggle("on", a.dataset.tab === hash); });
    if (hash === "org") { drawCanvas(); startCanvasAnim(); } else stopCanvasAnim();
    if (hash === "sop") renderSops();
    if (hash === "tugas") renderTaskBoard();
    if (hash === "jadwal") renderSchedule();
    if (hash === "ikhtisar") renderOverview();
    if (hash === "docs") renderDocs();
    if (hash === "masukan") loadHistory();
    if (state.tour.active) {
      requestAnimationFrame(() => {
        if (state.tour.active && state.tour.target) positionTourCard(state.tour.target);
        else if (state.tour.active) renderTourStep();
      });
    }
  }

  async function setGroup(group) {
    const changed = group !== state.group;
    $("group").value = group;
    state.group = group;
    localStorage.setItem(GROUP_KEY, group);
    if (changed) await refreshAll();
  }
  async function gotoGroup(group, hash) {
    await setGroup(group);
    location.hash = "#" + hash;
    showView();
  }

  async function loadTask() {
    const data = await api("/tasks?dept=" + state.dept);
    const task = data.task;
    $("dept-label").textContent = deptLabel(state.dept);
    $("task-title").textContent = task.title;
    $("task-brief").textContent = task.brief;
    $("task-output").textContent = task.output.replace("<kode>", state.group.toLowerCase());
    $("task-approver").textContent = task.approver;
    const callout = $("task-callout");
    if (task.callout) {
      callout.hidden = false;
      callout.textContent = task.callout;
    } else {
      callout.hidden = true;
      callout.textContent = "";
    }
    renderTaskBoard();
  }

  /* ---------- Tugas: kanban + tabel ---------- */
  function collectTaskRows() {
    if (!state.store?.tasks) return [];
    const mode = $("task-filter")?.value || "dept";
    const depts = mode === "all" ? DEPT_ORDER : [state.dept];
    const rows = [];
    depts.forEach((d) => {
      (state.store.tasks.depts[d]?.items || []).forEach((item) => rows.push({ ...item, _dept: d }));
    });
    return rows;
  }
  function taskColumn(status) {
    const s = String(status || "");
    if (/^Berjalan/i.test(s)) return "running";
    if (/^Menunggu/i.test(s)) return "waiting";
    if (/^Selesai/i.test(s)) return "done";
    return "draft";
  }
  function renderTaskBoard() {
    const kanban = $("task-kanban");
    const wrap = $("task-table-wrap");
    const body = $("task-body");
    if (!body || !state.store?.tasks) return;
    const mode = $("task-filter")?.value || "dept";
    const rows = collectTaskRows();
    $("task-count").textContent = rows.length + " " + t("overview_tasks_n");
    document.querySelectorAll("[data-task-view]").forEach((b) => {
      b.classList.toggle("on", b.dataset.taskView === state.taskView);
    });
    if (kanban) kanban.hidden = state.taskView !== "kanban";
    if (wrap) wrap.hidden = state.taskView !== "table";

    if (kanban) {
      const cols = [
        { id: "draft", label: t("kanban_draft") },
        { id: "running", label: t("kanban_running") },
        { id: "waiting", label: t("kanban_waiting") },
        { id: "done", label: t("kanban_done") },
      ];
      kanban.innerHTML = cols.map((col) => {
        const items = rows.filter((r) => taskColumn(r.status) === col.id);
        return `<section class="kanban-col${col.id === "waiting" ? " hitl" : ""}" data-col="${col.id}">
          <div class="kanban-head"><h3>${esc(col.label)}</h3><span class="kanban-count">${items.length}</span></div>
          ${items.map((item) => `<article class="kanban-card">
            <h4>${esc(item.project)}</h4>
            <p class="meta">${esc(item.owner)}${mode === "all" ? " · " + esc(deptLabel(item._dept)) : ""}</p>
            <p class="next">${esc(item.next_step)}</p>
            <p class="meta${item.deadline_warning ? " warn" : ""}">${esc(item.deadline || "—")} · ${statusChip(item.status)}</p>
          </article>`).join("")}
        </section>`;
      }).join("");
    }

    if (!rows.length) {
      body.innerHTML = `<tr><td colspan="6" class="empty">${esc(t("no_tasks"))}</td></tr>`;
      return;
    }
    body.innerHTML = rows.map((item) => `
      <tr>
        <td><strong>${esc(item.project)}</strong>${mode === "all" ? `<div class="meta">${esc(deptLabel(item._dept))}</div>` : ""}</td>
        <td>${esc(item.owner)}</td>
        <td>${statusChip(item.status)}</td>
        <td>${esc(item.next_step)}</td>
        <td class="${item.deadline_warning ? "warn" : ""}">${esc(item.deadline || "—")}</td>
        <td>${esc(item.updated || "")}</td>
      </tr>`).join("");
  }

  /* ---------- Jadwal: timeline + tabel ---------- */
  function parseTimeRange(str) {
    const m = String(str || "").match(/(\d{1,2}):(\d{2})(?:\s*[–—-]\s*(\d{1,2}):(\d{2}))?/);
    if (!m) return null;
    const start = Number(m[1]) + Number(m[2]) / 60;
    let end = m[3] !== undefined ? Number(m[3]) + Number(m[4]) / 60 : start + 1;
    if (end <= start) end = start + 1;
    return { start, end };
  }
  function jakartaHour() {
    try {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      const h = Number(parts.find((p) => p.type === "hour").value) % 24;
      const m = Number(parts.find((p) => p.type === "minute").value);
      return h + m / 60;
    } catch (_) {
      const d = new Date();
      return (d.getUTCHours() + 7) % 24 + d.getUTCMinutes() / 60;
    }
  }
  function filteredSchedules() {
    const mode = $("schedule-filter")?.value || "dept";
    let items = state.store?.schedules?.items || [];
    if (mode === "dept") items = items.filter((i) => i.dept === state.dept);
    return items.slice().sort((a, b) => String(a.time).localeCompare(String(b.time)));
  }
  function renderTimeline(items) {
    const box = $("timeline-inner");
    if (!box) return;
    const mode = $("schedule-filter")?.value || "dept";
    const lanes = mode === "dept" ? [state.dept] : DEPT_ORDER;
    const span = TL_END - TL_START;
    let hours = '<div class="timeline-hours"><span></span>';
    for (let h = TL_START; h < TL_END; h++) hours += `<span>${String(h).padStart(2, "0")}</span>`;
    hours += "</div>";
    const nowH = jakartaHour();
    const nowPct = ((nowH - TL_START) / span) * 100;
    const nowMark = nowH >= TL_START && nowH <= TL_END
      ? `<i class="timeline-now" data-now="1" title="WIB"></i>` : "";
    const laneHtml = lanes.map((d) => {
      const blocks = items.filter((i) => i.dept === d).map((i) => {
        const r = parseTimeRange(i.time);
        if (!r) return "";
        const s = Math.max(TL_START, r.start);
        const e = Math.min(TL_END, r.end);
        const left = ((s - TL_START) / span) * 100;
        const width = Math.max(((e - s) / span) * 100, 4);
        const paused = i.status === "Dijeda";
        return `<button type="button" class="timeline-block ${d}${paused ? " paused" : ""}" data-sch-edit="${esc(i.id)}"
          data-left="${left.toFixed(2)}" data-width="${width.toFixed(2)}"
          title="${esc(i.time + " · " + i.routine + " · " + i.owner + " · " + i.status)}">${esc(i.routine)}</button>`;
      }).join("");
      return `<div class="timeline-lane"><div class="timeline-lane-label">${esc(deptLabel(d))}</div>
        <div class="timeline-track">${blocks}${nowMark}</div></div>`;
    }).join("");
    box.innerHTML = hours + laneHtml;
    box.querySelectorAll("[data-now]").forEach((el) => { el.style.left = nowPct.toFixed(2) + "%"; });
    box.querySelectorAll("[data-sch-edit]").forEach((btn) => {
      btn.style.left = btn.getAttribute("data-left") + "%";
      btn.style.width = btn.getAttribute("data-width") + "%";
      btn.addEventListener("click", () => openScheduleEditor(btn.getAttribute("data-sch-edit")));
    });
  }
  function renderSchedule() {
    const body = $("schedule-body");
    if (!body || !state.store?.schedules) return;
    $("schedule-note").textContent = state.store.schedules.note || "";
    const items = filteredSchedules();
    $("schedule-count").textContent = items.length + " routine";
    document.querySelectorAll("[data-schedule-view]").forEach((b) => {
      b.classList.toggle("on", b.dataset.scheduleView === state.scheduleView);
    });
    const tl = $("schedule-timeline");
    const wrap = $("schedule-table-wrap");
    if (tl) tl.hidden = state.scheduleView !== "timeline";
    if (wrap) wrap.hidden = state.scheduleView !== "table";
    renderTimeline(items);

    if (!items.length) {
      body.innerHTML = `<tr><td colspan="7" class="empty">${esc(t("no_schedule"))}</td></tr>`;
      return;
    }
    body.innerHTML = items.map((i) => {
      const paused = i.status === "Dijeda";
      return `
      <tr>
        <td>${esc(i.time)}</td>
        <td>${esc(i.days)}</td>
        <td>${esc(i.routine)}</td>
        <td>${esc(i.owner)}</td>
        <td>${esc(deptLabel(i.dept))}</td>
        <td>${statusChip(i.status)}</td>
        <td class="row-actions-cell">
          <button type="button" class="btn" data-sch-edit="${esc(i.id)}">${esc(t("edit"))}</button>
          <button type="button" class="btn" data-sch-toggle="${esc(i.id)}">${esc(paused ? t("schedule_resume") : t("schedule_pause"))}</button>
          <button type="button" class="btn btn-danger" data-sch-del="${esc(i.id)}">${esc(t("delete"))}</button>
        </td>
      </tr>`;
    }).join("");
    body.querySelectorAll("[data-sch-edit]").forEach((btn) => {
      btn.addEventListener("click", () => openScheduleEditor(btn.getAttribute("data-sch-edit")));
    });
    body.querySelectorAll("[data-sch-del]").forEach((btn) => {
      btn.addEventListener("click", () => deleteSchedule(btn.getAttribute("data-sch-del")));
    });
    body.querySelectorAll("[data-sch-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => toggleSchedule(btn.getAttribute("data-sch-toggle")));
    });
  }

  function openScheduleEditor(id) {
    const item = id ? (state.store.schedules.items || []).find((i) => i.id === id) : null;
    $("sch-id").value = item ? item.id : "";
    $("sch-time").value = item ? item.time : "";
    $("sch-days").value = item ? item.days : "Senin–Jumat";
    $("sch-routine").value = item ? item.routine : "";
    $("sch-owner").value = item ? item.owner : "";
    $("sch-dept").value = item ? item.dept : state.dept;
    $("sch-status").value = item && item.status === "Dijeda" ? "Dijeda" : "Aktif";
    $("schedule-editor").showModal();
  }

  async function toggleSchedule(id) {
    const item = (state.store.schedules.items || []).find((i) => i.id === id);
    if (!item) return;
    try {
      await api("/schedules", {
        method: "POST",
        body: { action: "update", id, status: item.status === "Dijeda" ? "Aktif" : "Dijeda" },
      });
      renderSchedule();
      renderKpis();
      setMsg($("schedule-msg"), t("msg_schedule_saved"), true);
    } catch (e) { setMsg($("schedule-msg"), e.message, false); }
  }

  async function deleteSchedule(id) {
    if (!confirm(t("confirm_delete_schedule"))) return;
    try {
      await api("/schedules", { method: "POST", body: { action: "delete", id } });
      renderSchedule();
      renderKpis();
      setMsg($("schedule-msg"), t("msg_schedule_deleted"), true);
    } catch (e) { setMsg($("schedule-msg"), e.message, false); }
  }

  /* ---------- Tour ---------- */
  function clearTourTarget() {
    document.querySelectorAll(".tour-target").forEach((el) => el.classList.remove("tour-target"));
    state.tour.target = null;
  }

  function positionTourCard(target) {
    const card = $("tour-card");
    const spot = $("tour-spot");
    const pad = 8;
    const rect = target.getBoundingClientRect();
    spot.style.top = Math.max(0, rect.top - pad) + "px";
    spot.style.left = Math.max(0, rect.left - pad) + "px";
    spot.style.width = Math.min(window.innerWidth, rect.width + pad * 2) + "px";
    spot.style.height = Math.min(window.innerHeight, rect.height + pad * 2) + "px";

    const cardW = Math.min(360, window.innerWidth - 32);
    let top = rect.bottom + 14;
    let left = Math.min(Math.max(16, rect.left), window.innerWidth - cardW - 16);
    if (top + 200 > window.innerHeight) top = Math.max(16, rect.top - 200);
    card.style.width = cardW + "px";
    card.style.top = top + "px";
    card.style.left = left + "px";
  }

  function renderTourText() {
    const step = TOUR_STEPS[state.tour.step];
    if (!step) return;
    $("tour-step-n").textContent = String(state.tour.step + 1);
    $("tour-step-total").textContent = String(TOUR_STEPS.length);
    $("tour-title").textContent = t(step.title);
    $("tour-body").textContent = t(step.body);
    $("tour-prev").disabled = state.tour.step === 0;
    $("tour-next").textContent = state.tour.step === TOUR_STEPS.length - 1 ? t("tour_done") : t("tour_next");
    const bar = $("tour-progress-bar");
    if (bar) bar.style.width = (((state.tour.step + 1) / TOUR_STEPS.length) * 100) + "%";
  }

  function renderTourStep() {
    const step = TOUR_STEPS[state.tour.step];
    if (!step) { endTour(true); return; }
    if (step.hash && location.hash !== step.hash) {
      location.hash = step.hash;
      showView();
    }
    clearTourTarget();
    const target = document.querySelector(step.sel);
    if (!target) { endTour(true); return; }
    target.classList.add("tour-target");
    state.tour.target = target;
    target.scrollIntoView({ block: "nearest", inline: "nearest" });
    renderTourText();
    positionTourCard(target);
  }

  function startTour(force) {
    if (!force && localStorage.getItem(TOUR_KEY) === "1") return;
    state.tour.active = true;
    state.tour.step = 0;
    $("tour").hidden = false;
    document.body.style.overflow = "hidden";
    renderTourStep();
  }

  function endTour(markDone) {
    state.tour.active = false;
    clearTourTarget();
    $("tour").hidden = true;
    document.body.style.overflow = "";
    if (markDone) localStorage.setItem(TOUR_KEY, "1");
  }

  function tourNext() {
    if (state.tour.step >= TOUR_STEPS.length - 1) { endTour(true); return; }
    state.tour.step += 1;
    renderTourStep();
  }

  function tourPrev() {
    if (state.tour.step <= 0) return;
    state.tour.step -= 1;
    renderTourStep();
  }

  /* ---------- Ikhtisar: KPI, pipeline, kartu ---------- */
  function renderKpis() {
    const box = $("kpi-strip");
    if (!box || !state.store?.org) return;
    let agents = 0;
    let humans = 0;
    DEPT_ORDER.forEach((d) => {
      (state.store.org.depts[d]?.nodes || []).forEach((n) => {
        if (n.kind === "agent") agents += 1;
        else if (n.kind === "human") humans += 1;
      });
    });
    let tasks = 0;
    let waiting = 0;
    DEPT_ORDER.forEach((d) => {
      (state.store.tasks.depts[d]?.items || []).forEach((i) => {
        tasks += 1;
        if (String(i.status || "").startsWith("Menunggu")) waiting += 1;
      });
    });
    const sched = state.store.schedules.items || [];
    const paused = sched.filter((i) => i.status === "Dijeda").length;
    const active = sched.length - paused;

    const cards = [
      { key: "agents", accent: "mrp", value: agents, sub: t("kpi_agents_sub") },
      { key: "approvers", accent: "event", value: humans, sub: t("kpi_approvers_sub") },
      { key: "tasks", accent: "mblp", value: tasks, sub: waiting + " " + t("kpi_tasks_sub") },
      { key: "routines", accent: "digital", value: active, sub: paused + " " + t("kpi_routines_sub") },
    ];
    const signature = cards.map((c) => c.value).join("|");
    const animate = state.kpiPrev !== signature && !reducedMotion();
    state.kpiPrev = signature;

    box.innerHTML = cards.map((c) => `
      <div class="kpi-card" data-kpi="${c.key}">
        <p class="kpi-label">${esc(t("kpi_" + c.key))}</p>
        <p class="kpi-value" data-target="${c.value}">${animate ? 0 : c.value}</p>
        <p class="kpi-sub">${esc(c.sub)}</p>
      </div>`).join("");
    if (!animate) return;
    const els = box.querySelectorAll(".kpi-value");
    const dur = 700;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      els.forEach((el) => { el.textContent = String(Math.round(Number(el.dataset.target) * eased)); });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function pipelineArrow() {
    return `<div class="pipeline-arrow" aria-hidden="true"><svg viewBox="0 0 22 22"><polyline class="pipeline-flow" points="2,11 18,11" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="13,6 19,11 13,16" fill="none" stroke="currentColor" stroke-width="2"/></svg></div>`;
  }
  function renderPipeline() {
    const box = $("pipeline-track");
    if (!box) return;
    const deptNode = (d) => {
      const approver = state.store?.org?.depts?.[d]?.approver || "";
      return `<button type="button" class="pipeline-node${state.dept === d ? " active" : ""}" data-goto-group="${groupForDept(d)}" data-dept="${d}">
        <p class="pn-label">${esc(t("pipeline_" + d))}</p>
        <p class="pn-meta">${esc(deptLabel(d))}</p>
        ${approver ? `<span class="pn-badge">${esc(approver)}</span>` : ""}
      </button>`;
    };
    box.innerHTML = `
      <button type="button" class="pipeline-node" data-goto-mock="1">
        <p class="pn-label">${esc(t("pipeline_mock"))}</p><p class="pn-meta">mock-data/</p>
      </button>
      ${pipelineArrow()}
      ${deptNode("mrp")}
      ${pipelineArrow()}
      ${deptNode("event")}
      ${pipelineArrow()}
      <div class="pipeline-fork">${deptNode("mblp")}${deptNode("digital")}</div>
      ${pipelineArrow()}
      <button type="button" class="pipeline-node pipeline-gate" data-goto-hash="masukan">
        <p class="pn-label">${esc(t("pipeline_gate"))}</p><p class="pn-meta">HITL</p>
      </button>`;
    box.querySelectorAll("[data-goto-group]").forEach((btn) => {
      btn.addEventListener("click", () => gotoGroup(btn.getAttribute("data-goto-group"), "tugas").catch((e) => setMsg($("banner"), e.message, false)));
    });
    box.querySelectorAll("[data-goto-hash]").forEach((btn) => {
      btn.addEventListener("click", () => { location.hash = "#" + btn.getAttribute("data-goto-hash"); showView(); });
    });
    box.querySelector("[data-goto-mock]")?.addEventListener("click", () => {
      if (currentHash() !== "ikhtisar") { location.hash = "#ikhtisar"; showView(); }
    });
  }

  function renderOverview() {
    const deptsBox = $("overview-depts");
    const agentsBox = $("overview-agents");
    if (!deptsBox || !state.store?.org) return;
    renderKpis();
    renderPipeline();
    document.querySelectorAll("[data-overview]").forEach((btn) => {
      btn.classList.toggle("on", btn.dataset.overview === state.overviewMode);
    });
    deptsBox.hidden = state.overviewMode !== "depts";
    agentsBox.hidden = state.overviewMode !== "agents";

    deptsBox.innerHTML = DEPT_ORDER.map((d) => {
      const g = state.store.org.depts[d];
      const tasks = state.store.tasks.depts[d]?.items || [];
      const agents = (g.nodes || []).filter((n) => n.kind === "agent");
      return `<article class="ov-card" data-dept="${d}">
        <span class="dept-pill ${d}">${esc(d.toUpperCase())}</span>
        <h3>${esc(deptLabel(d))}</h3>
        <div class="meta">${esc(g.approver || "")} · ${agents.length} ${esc(t("overview_agents_n"))} · ${tasks.length} ${esc(t("overview_tasks_n"))}</div>
        <ul>${agents.map((a) => `<li>${esc(a.label)}</li>`).join("")}</ul>
        <div class="row-actions">
          <button type="button" class="btn btn-primary" data-open-tasks="${esc(groupForDept(d))}">${esc(t("open_tasks"))}</button>
          <button type="button" class="btn" data-open-org="${esc(groupForDept(d))}">${esc(t("open_org"))}</button>
        </div>
      </article>`;
    }).join("");
    deptsBox.querySelectorAll("[data-open-tasks]").forEach((btn) => {
      btn.addEventListener("click", () => gotoGroup(btn.getAttribute("data-open-tasks"), "tugas").catch((e) => setMsg($("banner"), e.message, false)));
    });
    deptsBox.querySelectorAll("[data-open-org]").forEach((btn) => {
      btn.addEventListener("click", () => gotoGroup(btn.getAttribute("data-open-org"), "org").catch((e) => setMsg($("banner"), e.message, false)));
    });

    const blurbs = state.store.docs?.agent_blurbs || {};
    const cards = [];
    DEPT_ORDER.forEach((d) => {
      (state.store.org.depts[d].nodes || []).forEach((n) => cards.push({ ...n, _dept: d }));
    });
    agentsBox.innerHTML = cards.map((n) => `
      <button type="button" class="ov-card" data-dept="${n._dept}" data-goto="${esc(groupForDept(n._dept))}">
        <span class="dept-pill ${n._dept}">${esc(n._dept.toUpperCase())}</span>
        <h3>${esc(n.label)}</h3>
        <div class="meta">${esc(deptLabel(n._dept))} · ${esc(n.kind === "human" ? t("kind_human_short") : t("kind_agent_short"))} · ${esc(n.holder || "")}</div>
        <p class="meta">${esc(blurbs[n.id] || "")}</p>
      </button>`).join("");
    agentsBox.querySelectorAll("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => gotoGroup(btn.getAttribute("data-goto"), "tugas").catch((e) => setMsg($("banner"), e.message, false)));
    });
  }

  function renderDocs() {
    const box = $("docs-body");
    if (!box || !state.store?.docs) return;
    const docs = state.store.docs;
    $("docs-summary").textContent = docs.summary || "";
    $("docs-updated").textContent = docs.updated_label || docs.updated || "";
    const blurbs = docs.agent_blurbs || {};

    box.innerHTML = (docs.sections || []).map((sec) => {
      let html = `<article class="docs-section"><h2>${esc(sec.heading)}</h2>`;
      if (sec.source_path) html += `<p class="path">${esc(t("docs_source"))}: ${esc(sec.source_path)}</p>`;
      (sec.blocks || []).forEach((b) => {
        if (b.type === "text") html += `<p>${esc(b.text)}</p>`;
        else if (b.type === "bullets") {
          html += `<ul>${(b.items || []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
        } else if (b.type === "agent_cards") {
          const nodes = state.store.org.depts[b.dept]?.nodes || [];
          html += `<h3 class="docs-dept-heading">${esc(deptLabel(b.dept))}</h3>`;
          html += `<div class="docs-agent-grid">${nodes.map((n) => `
            <div class="docs-agent">
              <strong>${esc(n.label)}</strong>
              <span>${esc(n.kind === "human" ? t("kind_human_short") : t("kind_agent_short"))} · ${esc(n.holder || "")}</span>
              <p class="docs-agent-blurb">${esc(blurbs[n.id] || "")}</p>
            </div>`).join("")}</div>`;
        } else if (b.type === "sop_ref") {
          html += `<div class="sop-ref">
            <strong>${esc(b.title)}</strong>
            <p class="path">${esc(b.path)}</p>
            <p><span class="muted">${esc(t("docs_for"))}:</span> ${esc(b.for || "")}</p>
            <p>${esc(b.summary || "")}</p>
          </div>`;
        }
      });
      html += "</article>";
      return html;
    }).join("");
  }

  /* ---------- Org canvas ---------- */
  async function loadOrg() {
    const data = await api("/org?dept=" + state.dept);
    state.graph = data.graph;
    state.selectedId = null;
    state.linkFrom = null;
    fillNodeForm(null);
    drawCanvas();
  }
  function fillNodeForm(node) {
    $("node-id").value = node ? node.id : "";
    $("node-id").readOnly = !!node;
    $("node-label").value = node ? node.label : "";
    $("node-kind").value = node ? node.kind : "agent";
    $("node-holder").value = node ? (node.holder || "") : "";
  }
  function nodeAt(x, y) {
    const nodes = state.graph.nodes || [];
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (x >= n.x && x <= n.x + NODE_W && y >= n.y && y <= n.y + NODE_H) return n;
    }
    return undefined;
  }
  function canvasPoint(ev) {
    const c = $("org-canvas");
    const r = c.getBoundingClientRect();
    return { x: (ev.clientX - r.left) * (CANVAS_W / r.width), y: (ev.clientY - r.top) * (CANVAS_H / r.height) };
  }
  function trim(s, n) {
    s = String(s || "");
    return s.length > n ? s.slice(0, n - 1) + "…" : s;
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function setupCanvasResolution(c) {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const bw = Math.round(CANVAS_W * dpr);
    const bh = Math.round(CANVAS_H * dpr);
    if (c.width !== bw || c.height !== bh) {
      c.width = bw;
      c.height = bh;
    }
    c.style.width = CANVAS_W + "px";
    c.style.maxWidth = "100%";
    c.style.height = "auto";
    c.style.aspectRatio = CANVAS_W + " / " + CANVAS_H;
    const ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }
  function bezierPoint(p0, p1, p2, p3, u) {
    const v = 1 - u;
    return {
      x: v * v * v * p0.x + 3 * v * v * u * p1.x + 3 * v * u * u * p2.x + u * u * u * p3.x,
      y: v * v * v * p0.y + 3 * v * v * u * p1.y + 3 * v * u * u * p2.y + u * u * u * p3.y,
    };
  }
  function drawCanvas() {
    const c = $("org-canvas");
    if (!c || c.closest(".view")?.hidden) return;
    const ctx = setupCanvasResolution(c);
    const dark = isDark();
    const animate = !reducedMotion();
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = dark ? "#1c232d" : "#eef1f5";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    ctx.fillStyle = dark ? "rgba(255,255,255,.08)" : "rgba(15,23,42,.10)";
    for (let gx = 12; gx < CANVAS_W; gx += 24) {
      for (let gy = 12; gy < CANVAS_H; gy += 24) ctx.fillRect(gx - 0.75, gy - 0.75, 1.5, 1.5);
    }

    const byId = Object.fromEntries((state.graph.nodes || []).map((n) => [n.id, n]));
    const lineCol = dark ? "#6e9bff" : "#0b6e4f";
    const tt = state.canvasAnim.t;
    (state.graph.edges || []).forEach((e, idx) => {
      const a = byId[e.from]; const b = byId[e.to];
      if (!a || !b) return;
      const p0 = { x: a.x + NODE_W / 2, y: a.y + NODE_H };
      const p3 = { x: b.x + NODE_W / 2, y: b.y };
      const dy = Math.max(30, Math.abs(p3.y - p0.y) * 0.5);
      const p1 = { x: p0.x, y: p0.y + dy };
      const p2 = { x: p3.x, y: p3.y - dy };
      ctx.strokeStyle = lineCol;
      ctx.globalAlpha = 0.65;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
      // panah di ujung
      const tip = p3;
      const prev = bezierPoint(p0, p1, p2, p3, 0.96);
      const ang = Math.atan2(tip.y - prev.y, tip.x - prev.x);
      ctx.fillStyle = lineCol;
      ctx.beginPath();
      ctx.moveTo(tip.x, tip.y);
      ctx.lineTo(tip.x - 9 * Math.cos(ang - 0.4), tip.y - 9 * Math.sin(ang - 0.4));
      ctx.lineTo(tip.x - 9 * Math.cos(ang + 0.4), tip.y - 9 * Math.sin(ang + 0.4));
      ctx.closePath();
      ctx.fill();
      if (animate) {
        const u = ((tt * 0.35) + idx * 0.27) % 1;
        const pt = bezierPoint(p0, p1, p2, p3, u);
        ctx.fillStyle = "#f59e0b";
        ctx.shadowColor = "#f59e0b";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    (state.graph.nodes || []).forEach((n) => {
      const selected = n.id === state.selectedId;
      const linking = n.id === state.linkFrom;
      const human = n.kind === "human";
      const accent = human ? "#f59e0b" : (dark ? "#6e9bff" : "#0f9d8a");
      ctx.save();
      ctx.shadowColor = dark ? "rgba(0,0,0,.45)" : "rgba(15,23,42,.14)";
      ctx.shadowBlur = selected ? 14 : 8;
      ctx.shadowOffsetY = 3;
      ctx.fillStyle = selected ? (dark ? "#16233f" : "#e6f4ef") : (dark ? "#151b23" : "#ffffff");
      roundRect(ctx, n.x, n.y, NODE_W, NODE_H, 12);
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = selected || linking ? accent : (dark ? "#353f4b" : "#d0d5dd");
      ctx.lineWidth = selected || linking ? 2.5 : 1.25;
      roundRect(ctx, n.x, n.y, NODE_W, NODE_H, 12);
      ctx.stroke();
      // bar aksen kiri
      ctx.save();
      roundRect(ctx, n.x, n.y, NODE_W, NODE_H, 12);
      ctx.clip();
      ctx.fillStyle = accent;
      ctx.fillRect(n.x, n.y, 5, NODE_H);
      ctx.restore();
      ctx.fillStyle = dark ? "#e6edf3" : "#111827";
      ctx.font = "600 13px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(trim(n.label, 20), n.x + 16, n.y + 26);
      ctx.fillStyle = dark ? "#8b949e" : "#6b7280";
      ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(trim((human ? t("kind_human_short") : t("kind_agent_short")) + " · " + (n.holder || ""), 24), n.x + 16, n.y + 46);
    });
  }

  function orgVisible() {
    const c = $("org-canvas");
    return !!c && !c.closest(".view")?.hidden;
  }
  function startCanvasAnim() {
    if (state.canvasAnim.raf || reducedMotion()) return;
    const loop = (now) => {
      if (!orgVisible() || reducedMotion()) { state.canvasAnim.raf = 0; return; }
      state.canvasAnim.t = now / 1000;
      drawCanvas();
      state.canvasAnim.raf = requestAnimationFrame(loop);
    };
    state.canvasAnim.raf = requestAnimationFrame(loop);
  }
  function stopCanvasAnim() {
    if (state.canvasAnim.raf) cancelAnimationFrame(state.canvasAnim.raf);
    state.canvasAnim.raf = 0;
  }

  function autoLayoutOrg() {
    const nodes = state.graph.nodes || [];
    if (!nodes.length) return;
    const edges = state.graph.edges || [];
    const humans = nodes.filter((n) => n.kind === "human");
    const rest = nodes.filter((n) => n.kind !== "human");
    const humanIds = new Set(humans.map((n) => n.id));
    let cos = rest.filter((n) => /(^|[-_])cos($|[-_])|chief/i.test(n.id + " " + n.label));
    if (!cos.length) cos = rest.filter((n) => edges.some((e) => e.to === n.id && humanIds.has(e.from)));
    const cosIds = new Set(cos.map((n) => n.id));
    const specialists = rest.filter((n) => !cosIds.has(n.id));
    const place = (list, y) => {
      const gap = 24;
      const perRow = Math.max(1, Math.floor((CANVAS_W + gap) / (NODE_W + gap)));
      list.forEach((n, i) => {
        const row = Math.floor(i / perRow);
        const inRow = Math.min(perRow, list.length - row * perRow);
        const idx = i - row * perRow;
        const total = inRow * NODE_W + (inRow - 1) * gap;
        n.x = Math.round((CANVAS_W - total) / 2 + idx * (NODE_W + gap));
        n.y = Math.min(CANVAS_H - NODE_H - 8, y + row * (NODE_H + 24));
      });
    };
    place(humans, 16);
    place(cos, 146);
    place(specialists, 266);
    drawCanvas();
    setMsg($("org-msg"), t("org_autolayout"), true);
  }

  function bindCanvas() {
    const c = $("org-canvas");
    c.addEventListener("pointerdown", (ev) => {
      const p = canvasPoint(ev);
      const n = nodeAt(p.x, p.y);
      if (!n) { state.selectedId = null; state.linkFrom = null; fillNodeForm(null); drawCanvas(); return; }
      state.selectedId = n.id; fillNodeForm(n);
      state.drag = { id: n.id, ox: p.x - n.x, oy: p.y - n.y };
      c.setPointerCapture(ev.pointerId); drawCanvas();
    });
    c.addEventListener("pointermove", (ev) => {
      if (!state.drag) return;
      const p = canvasPoint(ev);
      const n = state.graph.nodes.find((x) => x.id === state.drag.id);
      if (!n) return;
      n.x = Math.max(0, Math.min(CANVAS_W - NODE_W, p.x - state.drag.ox));
      n.y = Math.max(0, Math.min(CANVAS_H - NODE_H, p.y - state.drag.oy));
      drawCanvas();
    });
    c.addEventListener("pointerup", () => { state.drag = null; });
    c.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      const p = canvasPoint(ev);
      const n = nodeAt(p.x, p.y);
      if (!n) return;
      if (!confirm(t("confirm_delete_role") + " " + n.label + "?")) return;
      deleteNode(n.id);
    });
    c.addEventListener("dblclick", (ev) => {
      const p = canvasPoint(ev);
      const n = nodeAt(p.x, p.y);
      if (!n) return;
      if (state.linkFrom && state.linkFrom !== n.id) {
        state.graph.edges.push({ from: state.linkFrom, to: n.id });
        state.linkFrom = null;
      } else {
        state.linkFrom = n.id;
        setMsg($("org-msg"), t("msg_pick_second") + " " + n.label, true);
      }
      drawCanvas();
    });
  }
  async function saveGraph() {
    try {
      await api("/org", { method: "POST", body: { action: "save_graph", dept: state.dept, nodes: state.graph.nodes, edges: state.graph.edges } });
      setMsg($("org-msg"), t("msg_canvas_saved"), true);
    } catch (e) { setMsg($("org-msg"), e.message, false); }
  }
  async function deleteNode(id) {
    try {
      await api("/org", { method: "POST", body: { action: "delete_node", dept: state.dept, id } });
      await loadOrg();
      renderKpis();
      setMsg($("org-msg"), t("msg_role_deleted"), true);
    } catch (e) { setMsg($("org-msg"), e.message, false); }
  }

  /* ---------- SOP ---------- */
  async function loadSops() {
    const data = await api("/sops?dept=" + state.dept);
    state.sops = data.items || [];
    renderSops();
  }
  function renderSops() {
    const box = $("sop-list");
    if (!box) return;
    if (!state.sops.length) {
      box.innerHTML = `<p class="muted">${esc(t("no_sop"))}</p>`;
      return;
    }
    box.innerHTML = state.sops.map((s) => `
      <article class="sop-card" data-id="${esc(s.id)}">
        <h3>${esc(s.title)}</h3>
        <p class="path">${esc(s.source_path || t("no_path"))}</p>
        <p>${esc(s.summary || "")}</p>
        <p class="muted small">${esc(s.steps || "")}</p>
        <div class="sop-actions">
          <button type="button" class="btn" data-edit="${esc(s.id)}">${esc(t("edit"))}</button>
          <button type="button" class="btn btn-danger" data-del="${esc(s.id)}">${esc(t("delete_draft"))}</button>
        </div>
      </article>`).join("");
    box.querySelectorAll("[data-edit]").forEach((btn) => btn.addEventListener("click", () => openSopEditor(btn.getAttribute("data-edit"))));
    box.querySelectorAll("[data-del]").forEach((btn) => btn.addEventListener("click", () => deleteSop(btn.getAttribute("data-del"))));
  }
  function openSopEditor(id) {
    const s = id ? state.sops.find((x) => x.id === id) : null;
    $("sop-id").value = s ? s.id : "";
    $("sop-title").value = s ? s.title : "";
    $("sop-dept").value = s ? s.dept : state.dept;
    $("sop-path").value = s ? (s.source_path || "") : "";
    $("sop-summary").value = s ? (s.summary || "") : "";
    $("sop-steps").value = s ? (s.steps || "") : "";
    $("sop-editor").showModal();
  }
  async function deleteSop(id) {
    if (!confirm(t("confirm_delete_sop"))) return;
    try {
      await api("/sops", { method: "POST", body: { action: "delete", id } });
      await loadSops();
      setMsg($("sop-msg"), t("msg_sop_deleted"), true);
    } catch (e) { setMsg($("sop-msg"), e.message, false); }
  }

  async function loadHistory() {
    const data = await api("/history?group=" + encodeURIComponent(state.group));
    const box = $("history");
    const items = data.items || [];
    if (!items.length) {
      box.innerHTML = `<p class="muted">${esc(t("no_history"))} ${esc(state.group)}.</p>`;
      return;
    }
    box.innerHTML = items.map((e) => `
      <article class="hist-item">
        <div class="hist-meta">
          <span class="badge ${e.type === "org" ? "org" : ""}">${esc(e.type || "feedback")}</span>
          <span class="badge ${esc(e.forward_status || "queued")}">${esc(e.forward_status || "queued")}</span>
          <span>${esc(e.submitted_at || "")}</span>
        </div>
        <p>${esc(e.note || "")}</p>
      </article>`).join("");
  }

  /* ---------- Command palette ---------- */
  function buildCmdkItems() {
    const items = [];
    GROUPS.forEach((g) => {
      items.push({
        label: g, meta: "grup", kind: "group",
        run: () => gotoGroup(g, currentHash() || "ikhtisar"),
      });
    });
    TABS.forEach((tab) => {
      items.push({
        label: tab.label || t(tab.key), meta: "#" + tab.hash, kind: "tab",
        run: () => { location.hash = "#" + tab.hash; showView(); },
      });
    });
    if (state.store?.org) {
      DEPT_ORDER.forEach((d) => {
        (state.store.org.depts[d]?.nodes || []).forEach((n) => {
          items.push({
            label: n.label, meta: deptLabel(d) + " · " + (n.holder || n.id), kind: "agent",
            run: async () => {
              await gotoGroup(groupForDept(d), "org");
              const node = (state.graph.nodes || []).find((x) => x.id === n.id);
              if (node) { state.selectedId = node.id; fillNodeForm(node); drawCanvas(); }
            },
          });
        });
      });
    }
    if (state.store?.sops?.items) {
      state.store.sops.items.forEach((s) => {
        items.push({
          label: s.title, meta: "SOP · " + (s.source_path || s.dept), kind: "sop",
          run: async () => {
            const d = DEPT_ORDER.includes(s.dept) ? s.dept : state.dept;
            await gotoGroup(groupForDept(d), "sop");
            await loadSops();
            openSopEditor(s.id);
          },
        });
      });
    }
    if (state.store?.schedules?.items) {
      state.store.schedules.items.forEach((s) => {
        items.push({
          label: s.routine, meta: s.time + " · " + s.owner, kind: "schedule",
          run: async () => {
            await gotoGroup(groupForDept(s.dept), "jadwal");
            openScheduleEditor(s.id);
          },
        });
      });
    }
    return items;
  }
  function fuzzyScore(query, text) {
    const q = query.toLowerCase();
    const s = text.toLowerCase();
    if (!q) return 1;
    const idx = s.indexOf(q);
    if (idx >= 0) return 1000 - idx + (idx === 0 ? 200 : 0) - (s.length - q.length) * 0.1;
    let qi = 0;
    let score = 0;
    let streak = 0;
    for (let i = 0; i < s.length && qi < q.length; i++) {
      if (s[i] === q[qi]) { qi++; streak++; score += 2 + streak; } else streak = 0;
    }
    return qi === q.length ? score : -1;
  }
  function renderCmdk() {
    const list = $("cmdk-list");
    const q = $("cmdk-input").value.trim();
    const scored = buildCmdkItems()
      .map((it) => ({ it, score: Math.max(fuzzyScore(q, it.label), fuzzyScore(q, it.label + " " + it.meta) - 5) }))
      .filter((x) => x.score > 0);
    if (q) scored.sort((a, b) => b.score - a.score);
    state.cmdkItems = scored.slice(0, 40).map((x) => x.it);
    if (state.cmdkIndex >= state.cmdkItems.length) state.cmdkIndex = Math.max(0, state.cmdkItems.length - 1);
    if (!state.cmdkItems.length) {
      list.innerHTML = `<div class="cmdk-empty">${esc(t("cmdk_empty"))}</div>`;
      return;
    }
    list.innerHTML = state.cmdkItems.map((it, i) => `
      <button type="button" role="option" class="cmdk-item${i === state.cmdkIndex ? " active" : ""}" data-i="${i}" aria-selected="${i === state.cmdkIndex}">
        <span>${esc(it.label)}</span><span class="cmdk-meta">${esc(it.meta)}</span>
      </button>`).join("");
    list.querySelectorAll(".cmdk-item").forEach((btn) => {
      btn.addEventListener("click", () => runCmdk(Number(btn.dataset.i)));
      btn.addEventListener("mousemove", () => {
        const i = Number(btn.dataset.i);
        if (i !== state.cmdkIndex) { state.cmdkIndex = i; markCmdkActive(); }
      });
    });
  }
  function markCmdkActive() {
    $("cmdk-list").querySelectorAll(".cmdk-item").forEach((el, i) => {
      const on = i === state.cmdkIndex;
      el.classList.toggle("active", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
      if (on) el.scrollIntoView({ block: "nearest" });
    });
  }
  function openCmdk() {
    const d = $("cmdk");
    if (!d || d.open) return;
    $("cmdk-input").value = "";
    state.cmdkIndex = 0;
    d.showModal();
    renderCmdk();
    $("cmdk-input").focus();
  }
  function closeCmdk() {
    const d = $("cmdk");
    if (d?.open) d.close();
  }
  function runCmdk(i) {
    const it = state.cmdkItems[i];
    if (!it) return;
    closeCmdk();
    Promise.resolve(it.run()).catch((e) => setMsg($("banner"), e.message, false));
  }
  function bindCmdk() {
    $("cmdk-open")?.addEventListener("click", openCmdk);
    $("cmdk-input")?.addEventListener("input", () => { state.cmdkIndex = 0; renderCmdk(); });
    $("cmdk-input")?.addEventListener("keydown", (ev) => {
      const n = state.cmdkItems.length;
      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        if (n) { state.cmdkIndex = (state.cmdkIndex + 1) % n; markCmdkActive(); }
      } else if (ev.key === "ArrowUp") {
        ev.preventDefault();
        if (n) { state.cmdkIndex = (state.cmdkIndex - 1 + n) % n; markCmdkActive(); }
      } else if (ev.key === "Enter") {
        ev.preventDefault();
        runCmdk(state.cmdkIndex);
      } else if (ev.key === "Escape") {
        ev.preventDefault();
        closeCmdk();
      }
    });
    $("cmdk")?.addEventListener("click", (ev) => { if (ev.target === $("cmdk")) closeCmdk(); });
    document.addEventListener("keydown", (ev) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === "k") {
        ev.preventDefault();
        if ($("cmdk").open) closeCmdk(); else openCmdk();
      } else if (ev.key === "Escape" && $("cmdk")?.open) {
        closeCmdk();
      }
    });
  }

  async function refreshAll() {
    state.dept = deptFromGroup(state.group);
    await loadSeed();
    await Promise.all([loadTask(), loadOrg(), loadSops()]);
    applyLang();
    showView();
  }

  function applyTheme() {
    const mode = localStorage.getItem(THEME_KEY) || "auto";
    if (mode === "light" || mode === "dark") document.documentElement.dataset.theme = mode;
    else delete document.documentElement.dataset.theme;
    drawCanvas();
  }

  function init() {
    if (PREVIEW) document.documentElement.dataset.preview = "1";
    $("group").value = state.group;
    state.dept = deptFromGroup(state.group);
    applyTheme();
    bindCanvas();
    bindCmdk();

    document.querySelectorAll("#lang .lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.lang = btn.dataset.lang;
        localStorage.setItem(LANG_KEY, state.lang);
        applyLang();
      });
    });
    document.querySelectorAll("[data-overview]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.overviewMode = btn.dataset.overview;
        renderOverview();
      });
    });
    document.querySelectorAll("[data-task-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.taskView = btn.dataset.taskView === "table" ? "table" : "kanban";
        renderTaskBoard();
      });
    });
    document.querySelectorAll("[data-schedule-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.scheduleView = btn.dataset.scheduleView === "table" ? "table" : "timeline";
        renderSchedule();
      });
    });
    $("group").addEventListener("change", async () => {
      state.group = $("group").value;
      localStorage.setItem(GROUP_KEY, state.group);
      try { await refreshAll(); await loadHistory(); }
      catch (e) { setMsg($("banner"), e.message, false); }
    });
    $("theme").addEventListener("click", () => {
      const cur = localStorage.getItem(THEME_KEY) || "auto";
      const next = cur === "auto" ? "light" : cur === "light" ? "dark" : "auto";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(); applyLang();
    });
    $("task-filter")?.addEventListener("change", renderTaskBoard);
    $("schedule-filter")?.addEventListener("change", renderSchedule);
    $("schedule-reload")?.addEventListener("click", () => renderSchedule());
    $("schedule-add")?.addEventListener("click", () => openScheduleEditor(null));
    $("schedule-form")?.addEventListener("submit", async (ev) => {
      if (ev.submitter && ev.submitter.value === "cancel") return;
      ev.preventDefault();
      const id = $("sch-id").value.trim();
      try {
        await api("/schedules", {
          method: "POST",
          body: {
            action: id ? "update" : "create",
            id: id || undefined,
            time: $("sch-time").value.trim(),
            days: $("sch-days").value.trim(),
            routine: $("sch-routine").value.trim(),
            owner: $("sch-owner").value.trim(),
            dept: $("sch-dept").value,
            status: $("sch-status").value,
          },
        });
        $("schedule-editor").close();
        renderSchedule();
        renderKpis();
        setMsg($("schedule-msg"), t("msg_schedule_saved"), true);
      } catch (e) { setMsg($("schedule-msg"), e.message, false); }
    });

    $("tour-start")?.addEventListener("click", () => startTour(true));
    $("tour-skip")?.addEventListener("click", () => endTour(true));
    $("tour-prev")?.addEventListener("click", tourPrev);
    $("tour-next")?.addEventListener("click", tourNext);
    document.querySelectorAll("[data-tour-skip]").forEach((el) => {
      el.addEventListener("click", () => endTour(true));
    });
    window.addEventListener("resize", () => {
      if (state.tour.active && state.tour.target) positionTourCard(state.tour.target);
      drawCanvas();
    });

    window.addEventListener("hashchange", showView);
    document.querySelectorAll(".tabs a").forEach((a) => a.addEventListener("click", () => setTimeout(showView, 0)));

    $("org-reload").addEventListener("click", () => loadOrg().then(() => setMsg($("org-msg"), t("msg_reloaded"), true)).catch((e) => setMsg($("org-msg"), e.message, false)));
    $("org-save").addEventListener("click", saveGraph);
    $("org-autolayout")?.addEventListener("click", autoLayoutOrg);
    $("org-add").addEventListener("click", () => { state.selectedId = null; fillNodeForm(null); $("node-id").focus(); });
    $("org-form").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const node = {
        id: $("node-id").value.trim().toLowerCase(),
        label: $("node-label").value.trim(),
        kind: $("node-kind").value,
        holder: $("node-holder").value.trim(),
        x: 40, y: 40,
      };
      const existing = state.graph.nodes.find((n) => n.id === node.id);
      if (existing) { node.x = existing.x; node.y = existing.y; }
      try {
        await api("/org", { method: "POST", body: { action: existing ? "update_node" : "create_node", dept: state.dept, node } });
        await loadOrg();
        renderKpis();
        setMsg($("org-msg"), t("msg_role_saved"), true);
      } catch (e) { setMsg($("org-msg"), e.message, false); }
    });
    $("node-delete").addEventListener("click", () => {
      const id = $("node-id").value.trim();
      if (!id) return;
      if (!confirm(t("confirm_delete_role") + " " + id + "?")) return;
      deleteNode(id);
    });
    $("org-prompt").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const note = $("org-note").value.trim();
      if (!note) return;
      try {
        const res = await api("/respond", { method: "POST", body: { group: state.group, type: "org", note } });
        $("org-note").value = "";
        setMsg($("org-msg"), t("msg_prompt_sent") + " (" + (res.entry?.forward_status || "queued") + ").", true);
        await loadHistory();
      } catch (e) { setMsg($("org-msg"), e.message, false); }
    });

    $("sop-add").addEventListener("click", () => openSopEditor(null));
    $("sop-form").addEventListener("submit", async (ev) => {
      if (ev.submitter && ev.submitter.value === "cancel") return;
      ev.preventDefault();
      const id = $("sop-id").value.trim();
      try {
        await api("/sops", {
          method: "POST",
          body: {
            action: id ? "update" : "create", id: id || undefined,
            title: $("sop-title").value.trim(), dept: $("sop-dept").value,
            source_path: $("sop-path").value.trim(), summary: $("sop-summary").value.trim(),
            steps: $("sop-steps").value.trim(),
          },
        });
        $("sop-editor").close();
        await loadSops();
        setMsg($("sop-msg"), t("msg_sop_saved"), true);
      } catch (e) { setMsg($("sop-msg"), e.message, false); }
    });

    $("feedback-form").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      try {
        const res = await api("/respond", {
          method: "POST",
          body: { group: state.group, type: "feedback", note: $("feedback-note").value.trim() },
        });
        $("feedback-note").value = "";
        setMsg($("feedback-msg"), t("msg_feedback_saved") + " (" + (res.entry?.forward_status || "queued") + ").", true);
        await loadHistory();
      } catch (e) { setMsg($("feedback-msg"), e.message, false); }
    });
    $("history-reload").addEventListener("click", () => loadHistory().catch((e) => setMsg($("feedback-msg"), e.message, false)));

    refreshAll()
      .then(() => { setTimeout(() => startTour(false), 400); })
      .catch((e) => setMsg($("banner"), e.message, false));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
