import {  ref, computed } from 'vue'
import { h } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const level2Number = ref(0)

const menuData = computed(() => {

  let multipleLevelNode = findPoint(menus.value, 'Multiple Level')

  multipleLevelNode.child=constMultipleLevelChild.slice()

  for (let i = 0; i < level2Number.value; ++i) {
    let level2Node = {
      title: 'Another Level 2+'+(i+1),
      child: [
        {
          title: 'Level 3',
          child: [
            {
              title: 'Page',
            },
            {
              title: 'Page',
            },
          ],
        },
      ],
    }

    multipleLevelNode.child.push(level2Node)

  }

  return menus;
})

function findPoint(menus, title)
{
  for (let i = 0; i < menus.length; ++i) {
    let item = menus[i]

    if(item.title == title)
    {
      return item
    }
  }

}

const separator = h('hr', {
  style: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: '20px',
  },
})

const faIcon = (props) => {
  return {
    element: h('div', [h(FontAwesomeIcon, { size: 'lg', ...props })]),
  }
}

const constMultipleLevelChild = [
    {
      title: 'page',
    },
    {
      title: 'Level 2 ',
      child: [
        {
          title: 'page',
        },
        {
          title: 'Page',
        },
      ],
    },
    {
      title: 'Page',
    },
    {
      title: 'Another Level 2',
      child: [
        {
          title: 'Level 3',
          child: [
            {
              title: 'Page',
            },
            {
              title: 'Page',
            },
          ],
        },
      ],
    }
  ]

const menus =  ref([
    {
      header: 'Getting Started',
      hiddenOnCollapse: true,
    },
    {
      href: '/',
      title: 'Installation',
      icon: faIcon({ icon: 'fa-solid fa-download' }),
    },
    {
      href: '/basic-usage',
      title: 'Basic Usage',
      icon: faIcon({ icon: 'fa-solid fa-code' }),
    },
    {
      header: 'Usage',
      hiddenOnCollapse: true,
    },
    {
      href: '/props',
      title: 'Props',
      icon: faIcon({ icon: 'fa-solid fa-cogs' }),
    },
    {
      href: '/events',
      title: 'Events',
      icon: faIcon({ icon: 'fa-solid fa-bell' }),
    },
    {
      href: '/styling',
      title: 'Styling',
      icon: faIcon({ icon: 'fa-solid fa-palette' }),
    },
    {
      href: '/slots',
      title: 'Slots',
      icon: faIcon({ icon: 'fa-solid fa-cubes' }),
    },
    {
      component: separator,
    },
    {
      header: 'Examples',
      hiddenOnCollapse: true,
    },
    {
      href: '/disabled',
      title: 'Disabled page',
      icon: faIcon({ icon: 'fa-solid fa-lock' }),
      disabled: true,
    },
    {
      title: 'Badge',
      icon: faIcon({ icon: 'fa-solid fa-cog' }),
      badge: {
        text: 'new',
        class: 'vsm--badge_default',
      },
    },
    {
      href: '/page',
      title: 'Dropdown Page',
      icon: faIcon({ icon: 'fa-solid fa-list-ul' }),
      child: [
        {
          href: '/page/sub-page-1',
          title: 'Sub Page 01',
          icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' }),
        },
        {
          href: '/page/sub-page-2',
          title: 'Sub Page 02',
          icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' }),
        },
      ],
    },{
      title: 'Multiple Level',
      icon: faIcon({ icon: 'fa-solid fa-list-alt' }),
      child: constMultipleLevelChild.slice()
    }
    
  ])

  export {menuData, level2Number};