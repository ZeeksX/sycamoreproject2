<template>
    <div id="page">
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <div id="page-items" @click="goToTop">
                     <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="firstPage"><i class="bi bi-chevron-double-left"></i></a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
                    </li>
                    <li class="page-item" v-for="page in displayedPages" :key="page"
                        :class="{ active: page === currentPage }">
                        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="lastPage"><i class="bi bi-chevron-double-right"></i></a>
                    </li>
                </div>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: Number,
        totalPages: Number,
    },
    computed: {
        displayedPages() {
            const maxPages = window.innerWidth < 375 ? 2 : 3; 
            const startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
            const endPage = Math.min(startPage + maxPages - 1, this.totalPages);
            return this.getDisplayedPages(startPage, endPage);
        },
    },
    methods: {
        changePage(page) {
            this.$emit('changePage', page);
        },
        getDisplayedPages(startPage, endPage) {
            const displayed = [];
            for (let i = startPage; i <= endPage; i++) {
                displayed.push(i);
            }
            return displayed;
        },
        getAllPages(totalPages) {
            const pages = [];
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit('changePage', this.currentPage + 1);
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.$emit('changePage', this.currentPage - 1);
            }
        },
        firstPage(){
            this.$emit('changePage', 1);
        },
        lastPage(){
             this.$emit('changePage', this.totalPages);
        },
        goToTop(){
            const item = document.querySelector(".nav");
			if (item) {
				item.scrollIntoView({ behavior: "smooth" });
			}
        }
    },
};
</script>
