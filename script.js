"use strict";

// Ajuste para o número comercial da Vapty Play (DDI + DDD + número, apenas dígitos).
const CONTACT_WHATSAPP = "5575983151162";

const SERVERS = [
  { id: 1, name: "Datec Play", monogram: "▶", color: "#2ce1ed" },
  { id: 2, name: "Vapty Tradicional", monogram: "V", color: "#c477ff" },
  { id: 3, name: "Unix / P2X IPTV", monogram: "X", color: "#51a2ff" },
  { id: 4, name: "BR PRO VIP", monogram: "♛", color: "#ffd279" },
  { id: 5, name: "ZON", monogram: "Z", color: "#ff707a" },
  { id: 6, name: "BrTV (Phantom)", monogram: "◉", color: "#e8e8f0" },
  { id: 7, name: "Best Play", monogram: "▷", color: "#f46db5" },
  { id: 8, name: "Pro BR", monogram: "P", color: "#62eab3" },
  { id: 9, name: "Matrix Play", monogram: "M", color: "#62ddcc" },
  { id: 10, name: "Dragon TV", monogram: "✦", color: "#fa627c" },
  { id: 11, name: "Nuvix", monogram: "☁", color: "#79d4ff" },
  { id: 12, name: "PH Super", monogram: "★", color: "#ffd776" },
  { id: 13, name: "Unix / P2X Híbrido", monogram: "X", color: "#51a2ff" },
  { id: 14, name: "PlayTV", monogram: "▷", color: "#fb70cf" },
  { id: 15, name: "Brasil + TV", monogram: "◇", color: "#a1dc76" },
  { id: 16, name: "Rio Box", monogram: "≋", color: "#68c8ff" },
  { id: 17, name: "Razor's", monogram: "R", color: "#ff6b88" },
  { id: 18, name: "Yellow Box", monogram: "⬡", color: "#ffd366" },
  { id: 19, name: "H2MAX", monogram: "H", color: "#7bc8ff" },
  { id: 20, name: "Live Stream", monogram: "◉", color: "#fd7889" },
  { id: 21, name: "Orion Server", monogram: "◎", color: "#bc8cff" },
  { id: 22, name: "Royale", monogram: "♛", color: "#ffdb81" }
];

const $ = (selector) => document.querySelector(selector);
const serverGrid = $("#server-grid");
const searchInput = $("#server-search");
const serverCount = $("#server-count");
const emptyResults = $("#empty-results");
const planLabel = $("#selected-plan-label");
const planButtons = Array.from(document.querySelectorAll("[data-plan]"));
const dialog = $("#server-dialog");
let selectedPlan = "Pré-pago";
let lastOpenTrigger = null;

function normalizeSearch(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
}

function whatsappLink(message) {
  return "https://wa.me/" + CONTACT_WHATSAPP + "?text=" + encodeURIComponent(message);
}

function buildServerButton(server) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "server-card";
  button.dataset.serverId = String(server.id);
  button.setAttribute("aria-label", "Consultar servidor " + server.name);

  const number = document.createElement("span");
  number.className = "server-number";
  number.textContent = String(server.id).padStart(2, "0");

  const logo = document.createElement("span");
  logo.className = "server-logo";
  logo.style.color = server.color;
  logo.setAttribute("aria-hidden", "true");
  logo.textContent = server.monogram;

  const name = document.createElement("span");
  name.className = "server-name";
  name.textContent = server.name;

  const arrow = document.createElement("span");
  arrow.className = "server-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "›";

  button.append(number, logo, name, arrow);
  return button;
}

function renderServers(query = "") {
  const normalized = normalizeSearch(query);
  const matches = SERVERS.filter((server) => normalizeSearch(server.name).includes(normalized));
  serverGrid.replaceChildren(...matches.map(buildServerButton));
  serverCount.textContent = matches.length + (matches.length === 1 ? " destino encontrado" : " destinos encontrados");
  emptyResults.hidden = matches.length !== 0;
}

function setPlan(plan) {
  if (!["Pré-pago", "Pós-pago"].includes(plan)) return;
  selectedPlan = plan;
  planButtons.forEach((button) => {
    const isSelected = button.dataset.plan === plan;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  planLabel.replaceChildren();
  planLabel.append("Modalidade selecionada: ");
  const strong = document.createElement("strong");
  strong.textContent = plan;
  planLabel.append(strong, ". Agora escolha seu destino.");
}

function openServerDialog(serverId, trigger) {
  const server = SERVERS.find((item) => item.id === Number(serverId));
  if (!server) return;
  lastOpenTrigger = trigger;
  $("#dialog-title").textContent = server.name;
  $("#dialog-plan").textContent = selectedPlan;
  $("#dialog-icon").textContent = server.monogram;
  $("#dialog-icon").style.color = server.color;
  $("#dialog-whatsapp").href = whatsappLink(
    "Olá! Vim pelo site da Vapty Play. Tenho interesse na modalidade " +
    selectedPlan + " e gostaria de saber mais sobre o servidor " + server.name + "."
  );
  if (!dialog.open) dialog.showModal();
}

function closeMenu() {
  const menu = $("#main-nav");
  const button = $(".menu-toggle");
  menu.classList.remove("is-open");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Abrir menu");
}

planButtons.forEach((button) => button.addEventListener("click", () => setPlan(button.dataset.plan)));

searchInput.addEventListener("input", () => renderServers(searchInput.value));
$("#clear-search").addEventListener("click", () => {
  searchInput.value = "";
  renderServers();
  searchInput.focus();
});

serverGrid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-server-id]");
  if (trigger) openServerDialog(trigger.dataset.serverId, trigger);
});

$("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  if (lastOpenTrigger && lastOpenTrigger.isConnected) lastOpenTrigger.focus();
});

$(".menu-toggle").addEventListener("click", () => {
  const menu = $("#main-nav");
  const expanded = menu.classList.toggle("is-open");
  $(".menu-toggle").setAttribute("aria-expanded", String(expanded));
  $(".menu-toggle").setAttribute("aria-label", expanded ? "Fechar menu" : "Abrir menu");
});
document.querySelectorAll(".main-nav a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});

$("#general-contact").href = whatsappLink(
  "Olá! Vim pelo site da Vapty Play e gostaria de conhecer as opções de servidores e a modalidade " + selectedPlan + "."
);
planButtons.forEach((button) => button.addEventListener("click", () => {
  $("#general-contact").href = whatsappLink(
    "Olá! Vim pelo site da Vapty Play e gostaria de conhecer as opções de servidores e a modalidade " + selectedPlan + "."
  );
}));

$("#year").textContent = String(new Date().getFullYear());
renderServers();
setPlan(selectedPlan);
