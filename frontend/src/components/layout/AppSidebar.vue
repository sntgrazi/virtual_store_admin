<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-99999 border-r border-gray-200',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[90px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
  <div :class="[
    'py-8 flex',
    !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
  ]">
    <router-link to="/" class="inline-block">
      <!-- Logo completo para modo claro -->
      <svg v-if="isExpanded || isHovered || isMobileOpen"
           class="dark:hidden"
           xmlns="http://www.w3.org/2000/svg" 
           viewBox="0 0 400 120"
           width="200"
           height="60">
        <!-- Logo Box -->
        <g transform="translate(10, 10) scale(0.5)">
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#0f172a"/>
              <stop offset="100%" style="stop-color:#1e3a8a"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#bgGradient)"/>
          <path d="M60,120 L100,140 L140,120 L140,80 L100,60 L60,80 Z"
                fill="none"
                stroke="#3b82f6"
                stroke-width="3"/>
          <line x1="100" y1="60" x2="100" y2="140"
                stroke="#3b82f6"
                stroke-width="3"/>
          <line x1="60" y1="80" x2="100" y2="100"
                stroke="#3b82f6"
                stroke-width="3"/>
          <line x1="140" y1="80" x2="100" y2="100"
                stroke="#3b82f6"
                stroke-width="3"/>
          <circle cx="100" cy="100" r="8" fill="#60a5fa"/>
          <circle cx="60" cy="80" r="4" fill="#60a5fa"/>
          <circle cx="140" cy="80" r="4" fill="#60a5fa"/>
          <circle cx="100" cy="60" r="4" fill="#60a5fa"/>
          <circle cx="60" cy="120" r="4" fill="#60a5fa"/>
          <circle cx="140" cy="120" r="4" fill="#60a5fa"/>
          <circle cx="100" cy="140" r="4" fill="#60a5fa"/>
          <path d="M85,155 Q100,165 115,155" 
                stroke="#60a5fa"
                stroke-width="2"
                fill="none"/>
        </g>
        
        <!-- Texto StockNex -->
        <text x="130" y="70" 
              font-family="Arial, sans-serif" 
              font-size="42" 
              font-weight="bold" 
              fill="#0f172a">
          Stock<tspan fill="#3b82f6">Nex</tspan>
        </text>
      </svg>

      <!-- Logo completo para modo escuro -->
      <svg v-if="isExpanded || isHovered || isMobileOpen"
           class="hidden dark:block"
           xmlns="http://www.w3.org/2000/svg" 
           viewBox="0 0 400 120"
           width="200"
           height="60">
        <!-- Logo Box -->
        <g transform="translate(10, 10) scale(0.5)">
          <defs>
            <linearGradient id="bgGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1e40af"/>
              <stop offset="100%" style="stop-color:#3b82f6"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#bgGradientDark)"/>
          <path d="M60,120 L100,140 L140,120 L140,80 L100,60 L60,80 Z"
                fill="none"
                stroke="#93c5fd"
                stroke-width="3"/>
          <line x1="100" y1="60" x2="100" y2="140"
                stroke="#93c5fd"
                stroke-width="3"/>
          <line x1="60" y1="80" x2="100" y2="100"
                stroke="#93c5fd"
                stroke-width="3"/>
          <line x1="140" y1="80" x2="100" y2="100"
                stroke="#93c5fd"
                stroke-width="3"/>
          <circle cx="100" cy="100" r="8" fill="#bfdbfe"/>
          <circle cx="60" cy="80" r="4" fill="#bfdbfe"/>
          <circle cx="140" cy="80" r="4" fill="#bfdbfe"/>
          <circle cx="100" cy="60" r="4" fill="#bfdbfe"/>
          <circle cx="60" cy="120" r="4" fill="#bfdbfe"/>
          <circle cx="140" cy="120" r="4" fill="#bfdbfe"/>
          <circle cx="100" cy="140" r="4" fill="#bfdbfe"/>
          <path d="M85,155 Q100,165 115,155" 
                stroke="#bfdbfe"
                stroke-width="2"
                fill="none"/>
        </g>
        
        <!-- Texto StockNex -->
        <text x="130" y="70" 
              font-family="Arial, sans-serif" 
              font-size="42" 
              font-weight="bold" 
              fill="#ffffff">
          Stock<tspan fill="#bfdbfe">Nex</tspan>
        </text>
      </svg>

      <!-- Logo ícone para modo recolhido -->
      <svg v-else
           xmlns="http://www.w3.org/2000/svg" 
           viewBox="0 0 200 200"
           width="45"
           height="45">
        <defs>
          <linearGradient id="bgGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0f172a"/>
            <stop offset="100%" style="stop-color:#1e3a8a"/>
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#bgGradientIcon)"/>
        <path d="M60,120 L100,140 L140,120 L140,80 L100,60 L60,80 Z"
              fill="none"
              stroke="#3b82f6"
              stroke-width="3"/>
        <line x1="100" y1="60" x2="100" y2="140"
              stroke="#3b82f6"
              stroke-width="3"/>
        <line x1="60" y1="80" x2="100" y2="100"
              stroke="#3b82f6"
              stroke-width="3"/>
        <line x1="140" y1="80" x2="100" y2="100"
              stroke="#3b82f6"
              stroke-width="3"/>
        <circle cx="100" cy="100" r="8" fill="#60a5fa"/>
        <circle cx="60" cy="80" r="4" fill="#60a5fa"/>
        <circle cx="140" cy="80" r="4" fill="#60a5fa"/>
        <circle cx="100" cy="60" r="4" fill="#60a5fa"/>
        <circle cx="60" cy="120" r="4" fill="#60a5fa"/>
        <circle cx="140" cy="120" r="4" fill="#60a5fa"/>
        <circle cx="100" cy="140" r="4" fill="#60a5fa"/>
        <path d="M85,155 Q100,165 115,155" 
              stroke="#60a5fa"
              stroke-width="2"
              fill="none"/>
      </svg>
    </router-link>
  </div>
    <div
      class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar"
    >
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
            
            <ul class="flex flex-col gap-4">
              <li v-for="(item, index) in menuGroup.items" :key="item.name">
                <button
                  v-if="item.subItems"
                  @click="toggleSubmenu(groupIndex, index)"
                  :class="[
                    'menu-item group w-full',
                    {
                      'menu-item-active': isSubmenuOpen(groupIndex, index),
                      'menu-item-inactive': !isSubmenuOpen(groupIndex, index),
                    },
                    !isExpanded && !isHovered
                      ? 'lg:justify-center'
                      : 'lg:justify-start',
                  ]"
                >
                  <span
                    :class="[
                      isSubmenuOpen(groupIndex, index)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="menu-item-text"
                    >{{ item.name }}</span
                  >
                  <ChevronDownIcon
                    v-if="isExpanded || isHovered || isMobileOpen"
                    :class="[
                      'ml-auto w-5 h-5 transition-transform duration-200',
                      {
                        'rotate-180 text-brand-500': isSubmenuOpen(
                          groupIndex,
                          index
                        ),
                      },
                    ]"
                  />
                </button>
                <router-link
                  v-else-if="item.path"
                  :to="item.path"
                  :class="[
                    'menu-item group',
                    {
                      'menu-item-active': isActive(item.path),
                      'menu-item-inactive': !isActive(item.path),
                    },
                  ]"
                >
                  <span
                    :class="[
                      isActive(item.path)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="menu-item-text"
                    >{{ item.name }}</span
                  >
                </router-link>
                <transition
                  @enter="startTransition"
                  @after-enter="endTransition"
                  @before-leave="startTransition"
                  @after-leave="endTransition"
                >
                  <div
                    v-show="
                      isSubmenuOpen(groupIndex, index) &&
                      (isExpanded || isHovered || isMobileOpen)
                    "
                  >
                    <ul class="mt-2 space-y-1 ml-9">
                      <li v-for="subItem in item.subItems" :key="subItem.name">
                        <router-link
                          :to="subItem.path"
                          :class="[
                            'menu-dropdown-item',
                            {
                              'menu-dropdown-item-active': isActive(
                                subItem.path
                              ),
                              'menu-dropdown-item-inactive': !isActive(
                                subItem.path
                              ),
                            },
                          ]"
                        >
                          {{ subItem.name }}
                          <span class="flex items-center gap-1 ml-auto">
                            <span
                              v-if="subItem.new"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(
                                    subItem.path
                                  ),
                                  'menu-dropdown-badge-inactive': !isActive(
                                    subItem.path
                                  ),
                                },
                              ]"
                            >
                              new
                            </span>
                            <span
                              v-if="subItem.pro"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(
                                    subItem.path
                                  ),
                                  'menu-dropdown-badge-inactive': !isActive(
                                    subItem.path
                                  ),
                                },
                              ]"
                            >
                              pro
                            </span>
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import {
  GridIcon,
  CalenderIcon,
  UserCircleIcon,
  ChatIcon,
  MailIcon,
  DocsIcon,
  PieChartIcon,
  ChevronDownIcon,
  HorizontalDots,
  PageIcon,
  TableIcon,
  ListIcon,
  PlugInIcon,
  BoxIcon
} from "../../icons";

import BoxCubeIcon from "@/icons/BoxCubeIcon.vue";
import { useSidebar } from "@/composables/useSidebar";

const route = useRoute();

const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar();

const menuGroups = [
  {
    title: "Menu",
    items: [
      {
        icon: GridIcon,
        name: "Dashboard",
        path: "/dashboard",
      },
      {
        icon: BoxIcon,
        name: "Produtos",
        path: "/products",
      },
    ],
  },

];

const isActive = (path) => route.path === path;

const toggleSubmenu = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  openSubmenu.value = openSubmenu.value === key ? null : key;
};

const isAnySubmenuRouteActive = computed(() => {
  return menuGroups.some((group) =>
    group.items.some(
      (item) =>
        item.subItems && item.subItems.some((subItem) => isActive(subItem.path))
    )
  );
});

const isSubmenuOpen = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  return (
    openSubmenu.value === key ||
    (isAnySubmenuRouteActive.value &&
      menuGroups[groupIndex].items[itemIndex].subItems?.some((subItem) =>
        isActive(subItem.path)
      ))
  );
};

const startTransition = (el) => {
  el.style.height = "auto";
  const height = el.scrollHeight;
  el.style.height = "0px";
  el.offsetHeight; // force reflow
  el.style.height = height + "px";
};

const endTransition = (el) => {
  el.style.height = "";
};
</script>
