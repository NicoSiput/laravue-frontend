<template>
  <!-- Women Banner Section Begin -->
  <section class="women-banner spad">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 mt-5" v-if="products.length > 0">
          <carousel
            class="product-slider"
            :nav="false"
            :dots="false"
            :autoplay="true"
          >
            <div
              class="product-item"
              v-for="itemProduct in products"
              :key="itemProduct.id"
            >
              <div class="pi-pic">
                <!-- <img
                  v-bind:src="itemProduct.galleries[0].photo"
                  alt="Product Image"
                /> -->
                <img
                  src="data:image/jpeg;base64,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"
                  alt
                />
                <ul>
                  <li class="w-icon active">
                    <a
                      href="#"
                      @click="
                        saveKeranjang(
                          itemProduct.id,
                          itemProduct.name,
                          itemProduct.price
                        )
                      "
                    >
                      <i class="icon_bag_alt"></i>
                    </a>
                  </li>
                  <li class="quick-view">
                    <router-link v-bind:to="'/product/' + itemProduct.id"
                      >+ Quick View</router-link
                    >
                  </li>
                </ul>
              </div>
              <div class="pi-text">
                <div class="catagory-name">{{ itemProduct.type }}</div>
                <a href="#">
                  <h5>{{ itemProduct.name }}</h5>
                </a>
                <div class="product-price">
                  ${{ itemProduct.price }}
                  <span>$35.00</span>
                </div>
              </div>
            </div>
          </carousel>
        </div>

        <div class="col-lg-12" v-else>
          <p>Produk terbaru belum tersedia untuk saat ini</p>
        </div>
      </div>
    </div>
  </section>
  <!-- Women Banner Section End -->
</template>

<script>
import carousel from "vue-owl-carousel";
import Api from "../config/index";

export default {
  name: "WomenBanner",
  components: {
    carousel,
  },
  data() {
    return {
      products: [],
      keranjangUser: [],
    };
  },
  mounted() {
    if (localStorage.getItem("keranjangUser")) {
      try {
        this.keranjangUser = JSON.parse(localStorage.getItem("keranjangUser"));
      } catch (error) {
        localStorage.removeItem("keranjangUser");
      }
    }
    Api.get("/products")
      .then((res) => {
        this.products = res.data.data.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    saveKeranjang(idProduct, nameProduct, priceProduct, photoProduct) {
      // this.keranjangUser = JSON.parse(localStorage.getItem('keranjangUser'));
      var productStored = {
        id: idProduct,
        name: nameProduct,
        price: priceProduct,
        photo: photoProduct,
      };

      if (this.keranjangUser.find((e) => e.id === idProduct)) {
        this.$swal(
          "Error",
          nameProduct + " has been added to your Cart",
          "error"
        );
      } else {
        this.keranjangUser.push(productStored);
        const parsed = JSON.stringify(this.keranjangUser);
        localStorage.setItem("keranjangUser", parsed);

        this.$swal(
          "Add to Cart",
          nameProduct + " has been added to your Cart",
          "success"
        );

        window.location.reload();
      }
    },
  },
};
</script>

<style scoped>
.product-item {
  margin-right: 25px;
}
</style>
