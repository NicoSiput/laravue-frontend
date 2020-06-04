<template>
  <div class="cart">
    <HeaderNico />
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section text-left">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-text product-more">
              <router-link to="/">
                <i class="fa fa-home"></i> Home
              </router-link>
              <span>Shopping Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-12">
                <div class="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th class="p-name text-center">Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="keranjang in keranjangUser" :key="keranjang.id">
                        <td class="cart-pic first-row">
                          <img class="img-cart" :src="keranjang.photo" />
                        </td>
                        <td class="cart-title first-row text-center">
                          <h5>{{keranjang.name}}</h5>
                        </td>
                        <td class="p-price first-row">${{keranjang.price}}</td>
                        <td @click="removeItemCart(keranjang.index)" class="delete-item">
                          <a>
                            <i class="material-icons">close</i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-lg-8 text-left">
                <h4 class="mb-4">Informasi Pembeli:</h4>
                <div class="user-checkout">
                  <form>
                    <div class="form-group">
                      <label for="namaLengkap">Nama lengkap</label>
                      <input
                        type="text"
                        class="form-control"
                        id="namaLengkap"
                        aria-describedby="namaHelp"
                        placeholder="Masukan Nama"
                        v-model="customerInfo.name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">Email Address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Masukan Email"
                        v-model="customerInfo.email"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">No. HP</label>
                      <input
                        type="number"
                        class="form-control"
                        id="noHP"
                        aria-describedby="noHPHelp"
                        placeholder="Masukan No. HP"
                        v-model="customerInfo.number"
                      />
                    </div>
                    <div class="form-group">
                      <label for="alamatLengkap">Alamat Lengkap</label>
                      <textarea
                        class="form-control"
                        id="alamatLengkap"
                        rows="3"
                        v-model="customerInfo.address"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="proceed-checkout text-left">
                  <ul>
                    <li class="subtotal">
                      ID Transaction
                      <span>#SH12000</span>
                    </li>
                    <li class="subtotal mt-3">
                      Subtotal
                      <span>$ {{totalHarga}}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Pajak
                      <span>10% ( $ {{biayaPajak}} )</span>
                    </li>
                    <li class="subtotal mt-3">
                      Total Biaya
                      <span>$ {{totalBiaya}}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Bank Transfer
                      <span>Mandiri</span>
                    </li>
                    <li class="subtotal mt-3">
                      No. Rekening
                      <span>2208 1996 1403</span>
                    </li>
                    <li class="subtotal mt-3">
                      Nama Penerima
                      <span>Shayna</span>
                    </li>
                  </ul>
                  <!-- <router-link to="/success"> -->
                  <a @click="checkout()" href="#" class="proceed-btn">I ALREADY PAID</a>
                  <!-- </router-link> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shopping Cart Section End -->
  </div>
</template>

<script>
import HeaderNico from "@/components/HeaderNico.vue";
import axios from "axios";

export default {
  name: "Cart",
  components: {
    HeaderNico
  },
  data() {
    return {
      keranjangUser: [],
      customerInfo: {
        name: "",
        email: "",
        number: "",
        address: ""
      }
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
  },
  methods: {
    removeItemCart(index) {
      this.keranjangUser.splice(index, 1);
      const parsed = JSON.stringify(this.keranjangUser);
      localStorage.setItem("keranjangUser", parsed);
    },
    removeAllCart() {
      this.keranjangUser = [];
      const parsed = JSON.stringify(this.keranjangUser);
      localStorage.setItem("keranjangUser", parsed);
    },
    // fungsi mengirim data ke API
    checkout() {
      let productIds = this.keranjangUser.map(function(myProduct) {
        return myProduct.id;
      });

      let checkoutData = {
        name: this.customerInfo.name,
        email: this.customerInfo.email,
        number: this.customerInfo.number,
        address: this.customerInfo.address,
        transaction_total: this.totalBiaya,
        transaction_status: "PENDING",
        transaction_details: productIds
      };

      let msgResponse = "";
      axios
        .post("http://127.0.0.1:8000/api/checkout", checkoutData)
        .then(() => {
          // Tampil Swall
          this.$swal({
            title: "Success",
            text: "Success paid",
            type: "success"
          }).then(result => {
            if (result.value) {
              this.$router.push("success");
            }
          });
        })
        .catch(error => {
          if (error.response) {
            const err = error.response.data;
            const listError = err.errors;
            msgResponse =
              "<container class='d-flex justify-content-center'><ul>";
            for (const index in listError) {
              msgResponse += `<li> ${listError[index]} <br /></li>`;
            }
            msgResponse += "</ul></container>";

            // Tampil Swall
            this.$swal("Error", " " + msgResponse, "error").then(result => {
              if (result.value) {
                console.log("yeah" + msgResponse);
              }
            });
          }
        });
    }
  },
  computed: {
    totalHarga() {
      return this.keranjangUser.reduce(function(items, data) {
        return items + data.price;
      }, 0);
    },
    biayaPajak() {
      return (this.totalHarga * 10) / 100; // 10%
    },
    totalBiaya() {
      return this.totalHarga + this.biayaPajak;
    }
  }
};
</script>

<style scoped>
.img-cart {
  width: 100px;
  width: 100px;
}
</style>