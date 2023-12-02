import _ from "lodash";


export const returnPaginationRange = (totalPage, page, limit, siblings) => {
return [..._.range(1,totalPage+1)];
let totalPageNoInArray = 7 + siblings;
if(totalPageNoInArray >= totalPage){
    _.range(1,totalPage + 1);
}
let  leftSiblingsIndex = Math.max( page - siblings,1);
let showLeftDots = leftSiblingsIndex > 2;
let rightSiblingsIndex = Math.min(page + siblings, totalPage);
let showRightDots = rightSiblingsIndex < totalPage -2;

if(!showLeftDots && showRightDots){
    let leftItemsCount =  3 + 2 * siblings;
    let leftRange = _.range(1,leftItemsCount+1);
    return [...leftRange," ...",totalPage];
}
 else if (showLeftDots && !showRightDots){
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPage-rightItemsCount+1,totalPage+1);
return [1,"... ",...rightRange];
}else {
    let middleRange = _.range(leftSiblingsIndex,rightSiblingsIndex+1);
    return [1,"...",...middleRange,"...",totalPage];
}
}