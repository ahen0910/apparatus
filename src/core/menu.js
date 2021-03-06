'use strict'

const editNode = require('./editNode.js')
const core = require('./core.js')

let posY = ''
let posX = ''
// get mouse position on click
const mousePosition = selection => {
  posX = selection.renderedPosition.x
  posY = selection.renderedPosition.y
}

// remove the node menu element
const removeNodeMenu = () => {
  const parentEl = document.getElementById('window-id')
  const formEl = document.getElementById('nodeMenu-id')

  if (formEl !== null) parentEl.removeChild(formEl)
}

// removes the stage menu element
const removeStageMenu = () => {
  const parentEl = document.getElementById('window-id')
  const formEl = document.getElementById('stageMenu-id')

  if (formEl !== null) parentEl.removeChild(formEl)
}

// creates the node menu element
const nodeMenu = (cy, selection, selectedNode) => {
  const graph = document.getElementById('window-id')

  mousePosition(selection)

  // checks to see if the menu has been created
  const nodeMenuExists = document.getElementById('nodeMenu-id')
  if (nodeMenuExists === null) {
    const nodeMenu = document.createElement('button')
    nodeMenu.id = 'nodeMenu-id'
    nodeMenu.innerHTML = `<div class="dropdown" style='display: block; position: absolute; top:${posY}px; left: ${posX}px;'>
    <ul class="dropdown-menu" style='display:block;'>
    <li><a href="#edit-node">edit node</a></li>
    <li><a href="#show-neighbors">show neighbors</a></li>
    <li><a href="#delete">delete</a></li>
    </ul>
    </div>`

    nodeMenu.addEventListener('click', e => {
      const event = e.target.textContent

      if (event === 'show neighbors') {
        const neighborhood = selectedNode.neighborhood().add(selectedNode)
        cy.elements().addClass('faded')
        neighborhood.removeClass('faded')
      } else if (event === 'edit node') {
        editNode.formNode(selectedNode)
      } else if (event === 'delete') {
        core.deleteEl(cy, selectedNode, 0)
      }
      removeNodeMenu()
    })
    graph.appendChild(nodeMenu)
  } else {
    removeNodeMenu()
  }
}

// creates the stage menu element
const stageMenu = (cy, selection) => {
  const graph = document.getElementById('window-id')

  mousePosition(selection)

  // checks to see if the menu has been created
  const stageMenuExists = document.getElementById('stageMenu-id')
  if (stageMenuExists === null) {
    const stageMenu = document.createElement('button')
    stageMenu.id = 'stageMenu-id'
    stageMenu.innerHTML = `<div class="dropdown" style='display: block; position: absolute; top:${posY}px; left: ${posX}px;'>
      <ul class="dropdown-menu" style='display:block;'>
        <li><a href="#restore-node">restore node</a></li>
      </ul>
    </div>`

    graph.appendChild(stageMenu)

    stageMenu.addEventListener('click', e => {
      const event = e.target.textContent

      if (event === 'restore node') {
        core.restoreNode()
      }
      removeStageMenu()
    })
  } else {
    removeStageMenu()
  }
}

module.exports = {
  nodeMenu: nodeMenu,
  stageMenu: stageMenu,
  removeNodeMenu: removeNodeMenu,
  removeStageMenu: removeStageMenu
}
