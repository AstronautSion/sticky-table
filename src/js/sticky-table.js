class StickyTable{
    constructor(option) {
        this.target = null;
        this.datas = null;
        this.responsive = null;
        this.stickyCol = null;
        this.listCount = null;
        this.pageCount = null;

        this.confirmType(option);    
    }

    confirmType(option){
        
        var confirmOption = (callback) =>{
            if(typeof option == 'object' ){ 
                callback();
            }else{ 
                throw 'option is not object';
            }
        };
        var confirmOptionTarget = (callback) =>{
            if(document.getElementById(option.target)){
                this.target = document.getElementById(option.target);
                callback();
            }else{
                throw 'target id not defined';
            }
        };
        var confirmDatas = (callback) => {
            if(typeof option.datas == 'object'){
                 if(Object.keys(option.datas[0])){
                     console.log(Object.keys(option.datas[0]))
                    if( Object.keys(option.datas[0]).length == 2){
                        //head, body type 확인 하기.
                        callback();
                    }else{
                        throw 'plz create option.datas.head or option.datas.body';
                    }
                 }else{
                     throw 'plz create option.datas.head or option.datas.body';
                 }
            }else{
                throw 'option.datas wrong type';
            }
        };

        try {
            confirmOption(()=>{
                confirmOptionTarget(()=>{
                    confirmDatas(()=>{
                        this.init(option);
                        this.event();    
                    });
                });
            })
        
        } catch (e) {
            console.error(e);
            return;
        }
    }
    init(option){
        this.datas = option.datas[0];
        this.responsive = option.responsive;
        this.stickyCol = option.stickyCol;
        this.listCount = option.listCount || 10;
        this.pageCount = option.pageCount || 10;   
    }
    confirmTarget(){

    }
    event(){
        this.createTableLayout();
    }
    createPagination(){

    }
    
    createTableLayout(){
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
                    (tdBodyHtml += `<td>${this.datas.body[i][j]}</td>`) : 
                    ( tdStickyBodyHtml += `<td>${this.datas.body[i][j]}</td>` );
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
            this.target.innerHTML = `<thead><tr>${createContents().headHtml}</tr></thead><tbody>${createContents().bodyHtml}</tbody>`;
            if(this.responsive){ this.wrapDiv(table, 'responsive-table'); }

        }else{
            this.target.innerHTML = `<thead><tr>${createContents().headHtml}</tr></thead><tbody>${createContents().bodyHtml}</tbody>`;
            let othersHtml = `<table class="table"><thead><tr>${createContents().stickyHeadHtml}</tr></thead><tbody>${createContents().stickyBodyHtml}</tbody></table>`;
            let stickyTable = this.wrapDiv(this.wrapDiv(this.target, 'table-area table-area1'), 'sticky-table');
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

