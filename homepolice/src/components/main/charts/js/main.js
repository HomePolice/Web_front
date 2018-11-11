var nc = new NetChart({
    container: document.getElementById("netchart"),
    area: { height: 350 },
    data: { // 경로 사용 가능 ex) xxx.csv or .json
        preloaded: {
            nodes: netNode,
            links: packets
        }
    },
    interaction: { selection: { lockNodesOnMove: true } },
    style: {
        nodeStyleFunction: nodeStyle,
        linkStyleFunction: linkStyle
    }
});