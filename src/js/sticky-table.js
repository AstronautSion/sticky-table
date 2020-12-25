class stickyTable {
    constructor(option) {
        this.init(option);
        this.event();
    }
    init(option){
        this.targetId = option.targetId;
        this.datas = option.datas[0];
        this.responsive = option.responsive;
        this.stickyCol = option.stickyCol;
        this.listCount = option.listCount || 10;
        this.pageCount = option.pageCount || 10;
    }
    event(){
        let table = document.getElementById(this.targetId);
        this.createTableLayout(table);
    }
    createPagination(){

    }
    
    createTableLayout(table){
        let rowNum = this.datas.head.length;
        let colNum = this.datas.body.length

        let createContents = () =>{
            let headHtml = '';
            let bodyHtml = '';
            const bodyKeys = Object.keys(this.datas.body[0]);
            if( this.stickyCol ){
                var stickyHeadHtml = '';
                var stickyBodyHtml = '';  
            }
            
            // create head
            for(let i=0; i<rowNum; i++){ 
                ( !this.stickyCol || i < this.stickyCol) ? 
                headHtml += `<th>${this.datas.head[i]}</th>` : 
                stickyHeadHtml += `<th>${this.datas.head[i]}</th>`;
            }
            for(let i=0; i<colNum; i++){
                let tdBodyHtml = '';
                let tdStickyBodyHtml = '';
                for(let j=0; j<bodyKeys.length; j++){     
                    (!this.stickyCol || j < this.stickyCol) ? 
                    (tdBodyHtml += `<td>${this.datas.body[i][bodyKeys[j]]}</td>`) : 
                    ( tdStickyBodyHtml += `<td>${this.datas.body[i][bodyKeys[j]]}</td>` );
                }
                bodyHtml += `<tr>${tdBodyHtml}</tr>`;
                if( this.stickyCol ){ stickyBodyHtml += `<tr>${tdStickyBodyHtml}</tr>`; }
            }
            
            if( this.stickyCol ){
                console.log(stickyBodyHtml,stickyHeadHtml )
                return { headHtml, bodyHtml, stickyHeadHtml, stickyBodyHtml };
            }else{
                return { headHtml, bodyHtml};
            }
        }

        if(!this.stickyCol){
            table.innerHTML = `<thead><tr>${createContents().headHtml}</tr></thead><tbody>${createContents().bodyHtml}</tbody>`;
            if(this.responsive){ this.wrapDiv(table, 'responsive-table'); }

        }else{
            table.innerHTML = `<thead><tr>${createContents().headHtml}</tr></thead><tbody>${createContents().bodyHtml}</tbody>`;
            let othersHtml = `<table class="table"><thead><tr>${createContents().stickyHeadHtml}</tr></thead><tbody>${createContents().stickyBodyHtml}</tbody></table>`;
            let stickyTable = this.wrapDiv(this.wrapDiv(table, 'table-area table-area1'), 'sticky-table');
            stickyTable.insertAdjacentHTML('beforeend', `<div class="table-area table-area2">${othersHtml}</div>`);   
        } 
    }

    wrapDiv(table,className=''){
        let wrapTable = document.createElement('div');
        wrapTable.innerHTML = table.outerHTML;
        wrapTable.setAttribute('class',className);
        table.parentNode.insertBefore(wrapTable, table);
        table.remove();
        return wrapTable;
    }
}

