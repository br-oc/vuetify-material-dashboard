<template>
  <div class="panel-wrapper">
    <span class="logo">
      <img
        alt=""
        src="/images/logo_company.webp"
      >
    </span>

    <div class="slogan-wrapper">
      <div class="slogan">
        <img
          alt=""
          src="@/assets/logo_app.svg"
        >
      </div>
    </div>

    <div class="panel-content">
      <v-app class="login-con">
        <!-- <v-spacer></v-spacer> -->
        <v-main>
          <v-container
            class="fill-height"
            fluid
          >
            <v-row
              align="center"
              justify="center"
            >
              <v-col class="frame">
                <h1>
                  {{ $t("auth.login") }}
                </h1>
                <v-text-field
                  v-model="form.Email"
                  color="info"
                  :label="$t('validation.attributes.email')"
                  clearable
                  name="email"
                  prepend-icon="mdi-account"
                  required
                  @keyup.enter.native="login"
                />
                <v-text-field
                  v-model="form.Password"
                  color="info"
                  :append-icon="!showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  :label="$t('validation.attributes.password')"
                  :type="showPwd ? 'text' : 'password'"
                  name="password"
                  prepend-icon="mdi-lock"
                  required
                  current-password
                  @click:append="showPwd = !showPwd"
                  @keyup.enter.native="login"
                />
                <v-row>
                  <v-col>
                    <v-label
                      v-if="showError"
                      class="danger"
                    >
                      <span>{{ $t('auth.failed') }}</span>
                    </v-label>
                  </v-col>
                </v-row>  <v-row
                  align="end"
                  justify="end"
                >
                  <v-col>
                    <v-btn
                      :loading="loginLoading"
                      @click="submit"
                    >
                      <span slot="loader">Loading...</span>
                      {{ $t("enter") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-main>

        <v-footer
          color="#fbfbfb"
          height="auto"
        >
          <v-row>
            <v-col class="text-center">
              <!-- {{ ('common.copyrightMessage', { currentYear }) }} -->
            </v-col>
          </v-row>
        </v-footer>
      </v-app>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Login',
    data () {
      return {
        currentYear: new Date().getFullYear(),
        showPwd: false,
        form: {
          Email: '',
          Password: '',
        },
        loginLoading: false,
        showError: false,
      }
    },
    created () {
    },
    methods: {
      ...mapActions(['LogIn']),
      async submit () {
        try {
          await this.LogIn(this.form).then(async ({ data }) => {
            if (data.success) {
              await this.$router.push('/')
              this.showError = false
            } else {
              this.showError = true
            }
          })
        } catch (error) {
          console.log(error)
          this.showError = true
        }
      },
    },
  }
</script>

<style lang="scss">
@import '../sass/_login.scss';
</style>
