# HealthAssistant Frontend

HealthAssistant's frontend fork of Home Assistant. The `healthassistant` branch
starts from upstream release `20260930.4`, paired with the HealthAssistant Core
2026.10.2 facilities implementation. The upstream application is preserved as the
baseline; the hospital interface changes are the next development milestone.

See [HealthAssistant development](docs/healthassistant-development.md) for setup,
build commands, and connecting this checkout to Core.

## Upstream project

This is the repository for the official [Home Assistant](https://home-assistant.io) frontend.

[![Screenshot of the frontend](https://raw.githubusercontent.com/home-assistant/frontend/master/docs/screenshot.png)](https://demo.home-assistant.io/)

- [View demo of Home Assistant](https://demo.home-assistant.io/)
- [More information about Home Assistant](https://home-assistant.io)
- [Frontend development instructions](https://developers.home-assistant.io/docs/frontend/development/)

## Development

- Initial setup: `script/setup`
- Development: [Instructions](https://developers.home-assistant.io/docs/frontend/development/)
- Production build: `pnpm build`
- Gallery: `cd gallery && script/develop_gallery`

## Frontend development

### Classic environment

A complete guide can be found at the following [link](https://www.home-assistant.io/developers/frontend/). It describes a short guide for the build of project.

## License

Home Assistant is open-source and Apache 2 licensed. Feel free to browse the repository, learn and reuse parts in your own projects.

We use [BrowserStack](https://www.browserstack.com) to test Home Assistant on a large variety of devices.

[![Home Assistant - A project from the Open Home Foundation](https://www.openhomefoundation.org/badges/home-assistant.png)](https://www.openhomefoundation.org/)
