<template>
  <div class="hero height-full">
    <Center>
      <img src="/slogin.png" />
      <h4 class="m-0">steemlogin</h4>
      <div class="mt-4 mb-7">
        <h1 class="mb-6">Your account, your keys.</h1>
        <!-- <div class="columns mb-6 hide-sm">
          <div class="column one-half v-align-middle">
            <a
              :href="chromeExtensionUrl"
              target="_blank"
              class="d-block rounded-2 px-3 py-2 bg-primary text-white text-left"
            >
              <span class="iconfont icon-chrome float-right" />
              Download extension
            </a>
          </div>
          <div class="column one-half v-align-middle">
            <a
              :href="pkg.repository.url.replace('.git', '/releases')"
              target="_blank"
              class="d-block rounded-2 px-3 py-2 bg-primary text-white text-left"
            >
              <span class="iconfont icon-desktop-windows float-right" />
              Download Desktop app
            </a>
          </div>
        </div> -->
        <p>
          With SteemLogin, you're always in control of your private keys: we neither store nor have
          access to them.
        </p>
        <p class="vote">
          Vote for our witness on Steem:
          <a
            target="_blank"
            href="https://steemlogin.com/sign/account-witness-vote?witness=future.witness&approve=1"
            >@futurewitness</a
          >
        </p>
      </div>
      <Footer />
    </Center>
  </div>
</template>

<script>
import pkg from '@/../package.json';

const chromeExtensionUrl =
  'https://chrome.google.com/webstore/detail/steemlogin/nacgccgpafjbbjghlbiealblilfcnfpj';

export default {
  data() {
    return {
      pkg,
      chromeExtensionUrl,
    };
  },
};
</script>

<style scoped lang="less">
.icon-chrome,
.icon-desktop-windows {
  font-size: 32px;
}

.vote {
  color: #06d6a9;
}
</style>
