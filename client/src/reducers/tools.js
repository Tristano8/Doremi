const tools = (state = { activeTool: '4' }, action) => {
    switch (action.type) {
        case 'TOGGLE_TOOL':
          return {...state, activeTool: action.tool }
        default:
          return {...state}
    }
}

export default tools;