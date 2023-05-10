<template>
  <div>
    <Header title="Developers" />
    <div class="p-4 after-header">
      <div class="container-sm mx-auto mb-4">
        <p class="mb-4">
          You’ve found the SteemLogin developer documentation! This page dedicated to showing you
          all the ways that you can use SteemLogin to make cool stuff.
        </p>
        <a
          @click="selectSection('new-app')"
          class="Box p-3 d-block border rounded-1 overflow-hidden mb-3"
        >
          <h4 class="m-0">Add new app</h4>
        </a>
        <div v-if="selectedSection === 'new-app'" class="mb-4">
          <div class="mb-3">
            <p>
              To create a new app on SteemLogin you need a Steem account for it. If you don't have
              one yet you can create one on
              <a href="https://signup.steemit.com" target="_blank">signup.steemit.com</a>. Once you
              have a Steem account for your app, click on the button below, log in with your app
              account and update your profile with "application" as account type.
            </p>
            <router-link to="/profile" class="btn btn-large">
              Enable app
            </router-link>
          </div>
          <p>
            If you would like to use the OAuth 2 API for posting with SteemLogin server you need to
            authorize the Steem account "steemlogin" to post on the behalf of your app account.
            <router-link to="/authorize/steemlogin">Click here</router-link>
            to do this and sign with your app account.
          </p>
        </div>
        <a
          @click="selectSection('edit-app')"
          class="Box p-3 d-block border rounded-1 overflow-hidden mb-3"
        >
          <h4 class="m-0">Edit app settings</h4>
        </a>
        <div v-if="selectedSection === 'edit-app'" class="mb-4">
          <p>You can edit your app settings by updating your app account profile.</p>
          <router-link to="/profile" class="btn btn-large">
            Edit app settings
          </router-link>
        </div>
        <a
          @click="selectSection('sdk')"
          class="Box p-3 d-block border rounded-1 overflow-hidden mb-3"
        >
          <h4 class="m-0">SDK</h4>
        </a>
        <div v-if="selectedSection === 'sdk'" class="mb-4">
          <p>
            Get started integrating SteemLogin on your website with SteemLogin.js, the official
            JavaScript SDK.
          </p>
          <p>
            <a href="https://github.com/futureshockco/steemlogin.js" target="_blank"
              ><span class="iconfont icon-mark-github" /> SteemLogin.js</a
            >
          </p>
        </div>
        <a
          @click="selectSection('demo')"
          class="Box p-3 d-block border rounded-1 overflow-hidden mb-3"
        >
          <h4 class="m-0">Demo</h4>
        </a>
        <div v-if="selectedSection === 'demo'" class="mb-4">
          <p class="mt-2">Checkout SteemLogin demo with Vue.js</p>
          <p>
            <a
              href="https://github.com/futureshockco/steemlogin.js/blob/master/docs/index.html"
              target="_blank"
            >
              <span class="iconfont icon-mark-github" /> See on GitHub
            </a>
          </p>
        </div>
        <a
          @click="selectSection('oauth2')"
          class="Box p-3 d-block border rounded-1 overflow-hidden mb-3"
        >
          <h4 class="m-0">OAuth2</h4>
        </a>
        <div v-if="selectedSection === 'oauth2'" class="mb-4">
          <p>
            The first step in implementing OAuth2 is registering a developer application, and
            retrieving your client ID and client secret. The URL for OAuth2 is as follows:
          </p>
          <p>
            <b>Token URL</b><br />
            https://api.steemlogin.com/api/oauth2/token
          </p>
        </div>
        <a
          @click="selectSection('help')"
          class="Box p-3 d-block border rounded-1 overflow-hidden mb-3"
        >
          <h4 class="m-0">Getting help</h4>
        </a>
        <div v-if="selectedSection === 'help'" class="mb-4">
          <p>
            If you believe you're experiencing a bug with our API or want to report incorrect
            documentation, open an issue on our issue tracker. For a more real-time avenue of
            communication, check out the official Discord server. There you'll find community
            members who can help answer questions about our API, libraries and other development
            questions.
          </p>
          <p v-if="pkg.bugs">
            <a :href="pkg.bugs.url" target="_blank">
              <span class="iconfont icon-mark-github" /> Report a bug
            </a>
          </p>
          <p>
            <a href="https://discord.me/drugwars" target="_blank">
              <span class="iconfont icon-discord" /> Join us on Discord
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pkg from '@/../package.json';

export default {
  data() {
    return {
      pkg,
      selectedSection: false,
    };
  },
  methods: {
    selectSection(section) {
      this.selectedSection = this.selectedSection === section ? false : section;
    },
  },
};
</script>
