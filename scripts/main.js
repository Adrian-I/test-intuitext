const list10k = Array.from(new Array(9986).keys()).map(i => "Item: " + i);

class Paginator {

  constructor(options) {
    this.defaults = {
      pageSize : 10,
      items: []
    };
    Object.assign(this.defaults,  options);

    this.currentIndex = 0;
    this.lastPageIndex = this.getLastPageIndex();

    this.renderList();
    this.nextPage();
    this.prevPage();
    this.firstPage();
    this.lastPage();
    this.goToPage();
  }


  renderList(startIndex = 0) {
    let listHtml = "";

    for (let i = startIndex; i < startIndex + this.defaults.pageSize; i++) {

      if (this.defaults.items[i] !== undefined) {
        listHtml += "<li>" + this.defaults.items[i] + "</li>"
      }
    }

    document.querySelector('.list__contents').innerHTML = listHtml;
  }

  nextPage() {
    document.querySelector('.list__next').addEventListener('click', () => {
      let nextPageIndex = this.currentIndex + this.defaults.pageSize ;

      if ( nextPageIndex <= this.lastPageIndex) {
        this.currentIndex = nextPageIndex;
        this.renderList(this.currentIndex);
      }
    })
  }

  prevPage() {
    document.querySelector('.list__prev').addEventListener('click', () => {
      let prevPageIndex = this.currentIndex - this.defaults.pageSize ;

      if ( prevPageIndex >= 0 ) {
        this.currentIndex = prevPageIndex;
        this.renderList(this.currentIndex);
      }
    })
  }

  firstPage() {
    document.querySelector('.list__firstPage').addEventListener('click', () => {
      this.currentIndex = 0;
      this.renderList(this.currentIndex);
    })
  }

  lastPage() {
    document.querySelector('.list__lastPage').addEventListener('click', () => {
      this.currentIndex = this.lastPageIndex;
      this.renderList(this.currentIndex);
    })
  }

  goToPage() {
    document.querySelector('.list__goToPage').addEventListener('keydown', (e) => {
      let nextPage = parseInt(e.target.value) * this.defaults.pageSize;

      if( e.which === 13 && nextPage >= 0 && nextPage <= this.lastPageIndex) {
        this.currentIndex = nextPage;
        this.renderList(this.currentIndex);
      }
    })
  }

  isFirstPage() {
    return this.currentIndex === 0;
  }

  isLastPage() {
    return this.currentIndex === this.lastPageIndex;
  }

  getLastPageIndex() {
    let partialResult = this.defaults.items.length / this.defaults.pageSize;

    if ( partialResult % 1 === 0) {
      return (partialResult -1) * this.defaults.pageSize;
    }

    return Math.floor(partialResult) * this.defaults.pageSize;
  }

}

const paginator = new Paginator({pageSize:10, items:list10k});
