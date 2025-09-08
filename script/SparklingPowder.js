// 기존 MCPE에 존재하지 않은 새로운 블록을 추가하는 부분
Block.defineBlock(234, 'Sparkling Powder', [['sparkling_powder', 0]], 1, false, 11); //전선
Block.setDestroyTime(234, 1);
Block.setRenderLayer(234, 5);
Block.setLightOpacity(234, 0);
Block.defineBlock(235, 'Light Stone (on)', [['light_stone', 0]], 0, false, 0); //켜진 전등
Block.setLightLevel(235, 15);
Block.setDestroyTime(235, 1);
Block.defineBlock(236, 'Light Stone (off)', [['light_stone', 1]], 0, false, 0); //꺼진 전등
Block.setDestroyTime(236, 1);
Block.defineBlock(237, 'Switch', [['switch', 0]], 0, false, 0); //스위치
Block.setDestroyTime(237, 1);

// 숙이지 않은 상태로 스위치를 터치하면 탐색 시작
function useItem(x, y, z, itemId, blockId) { //블록 터치하면 작동
    if (blockId == 237) { //터치한 블록이 스위치라면
        if (Entity.isSneaking(Player.getEntity())) return; //터치한 사람이 숙이고 있다면 실행 중단
        dfs([], x, y, z, true); //탐색 시작
        preventDefault(); //기존에 실행될 내용 제거 (블록 설치 방지)
    }
}

// 깊이우선탐색
function dfs(checked, x, y, z, isStart) {
    var pos = x + ',' + y + ',' + z;
    
    
    // 이미 방문한 곳이면 아무것도 하지 않음
    // 깊이우선탐색.includes();가 없는 옛날에 만들어진 환경에서 구동하기에, .indexOf(); 사용
    if (checked.indexOf(pos) != -1) return;
    
    // 방문 목록에 추가
    checked.push(x + ',' + y + ',' + z);
    
    // 현재 위치에 있는 블록 확인
    var blockId = getTile(x, y, z);
    
    // 현재 위치에 있는 블록이 전등이라면 끄거나 켜기
    if (blockId == 235) {
        setTile(x, y, z, 236);
    } else if (blockId == 236) {
        setTile(x, y, z, 235);
    }

    // 현재 위치에 있는 블록이 전선이라면, 상하전후좌우 블록 전부 확인
    // 탐색 1회차인 경우(스위치 터치)도 상하전후좌우 블록 전부 확인
    if (blockId == 234 || isStart) {
        dfs(checked, x + 1, y, z);
        dfs(checked, x - 1, y, z);
        dfs(checked, x, y + 1, z);
        dfs(checked, x, y - 1, z);
        dfs(checked, x, y, z + 1);
        dfs(checked, x, y, z - 1);
    }
}

