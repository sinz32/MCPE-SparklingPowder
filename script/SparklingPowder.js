Block.defineBlock(234, 'Sparkling Powder', [['sparkling_powder', 0]], 1, false, 11);
Block.setDestroyTime(234, 1);
Block.setRenderLayer(234, 5);
Block.setLightOpacity(234, 0);
Block.defineBlock(235, 'Light Stone (on)', [['light_stone', 0]], 0, false, 0);
Block.setLightLevel(235, 15);
Block.setDestroyTime(235, 1);
Block.defineBlock(236, 'Light Stone (off)', [['light_stone', 1]], 0, false, 0);
Block.setDestroyTime(236, 1);
Block.defineBlock(237, 'Switch', [['switch', 0]], 0, false, 0);
Block.setDestroyTime(237, 1);

function useItem(x, y, z, itemId, blockId) {
    if (blockId == 237) {
        if (Entity.isSneaking(Player.getEntity())) return;
        bfs([], x, y, z, true);
        preventDefault();
    }
}

function bfs(checked, x, y, z, isStart) {
    var pos = x + ',' + y + ',' + z;
    if (checked.indexOf(pos) != -1) return;
    checked.push(x + ',' + y + ',' + z);
    
    var blockId = getTile(x, y, z);
    if (blockId == 235) {
        setTile(x, y, z, 236);
    } else if (blockId == 236) {
        setTile(x, y, z, 235);
    }

    if (blockId == 234 || isStart) {
        bfs(checked, x + 1, y, z);
        bfs(checked, x - 1, y, z);
        bfs(checked, x, y + 1, z);
        bfs(checked, x, y - 1, z);
        bfs(checked, x, y, z + 1);
        bfs(checked, x, y, z - 1);
    }
}

