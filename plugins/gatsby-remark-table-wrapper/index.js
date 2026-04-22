const visit = require('unist-util-visit')

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'table', (node, index, parent) => {
    const wrapper = {
      type: 'tableWrapper',
      data: {
        hName: 'div',
        hProperties: {
          className: ['table-wrapper'],
        },
      },
      children: [JSON.parse(JSON.stringify(node))],
    }
    parent.children.splice(index, 1, wrapper)

    return [visit.SKIP, index + 1]
  })

  return markdownAST
}
