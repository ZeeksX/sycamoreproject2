<template>
    <div id="page">
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
                </li>
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
    methods: {
        changePage(page) {
            this.$emit('changePage', page);
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
    },
};
</script>
