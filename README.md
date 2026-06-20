# Cleaning History Card

A custom [Home Assistant](https://www.home-assistant.io/) Lovelace card to browse a robot vacuum's historical cleaning maps. Many vacuum integrations (e.g. Dreame/Xiaomi via the `camera` entity) expose a `cleaning_history_picture` attribute: a list of past cleaning runs, each mapped to an image URL. Lovelace has no built-in way to pick one of these and display it — this card adds a dropdown to do exactly that.

![Example](docs/screenshot.png)

## Installation

### HACS (custom repository)

1. In HACS, go to **Frontend** → menu (⋮) → **Custom repositories**.
2. Add this repository's URL, category **Lovelace**.
3. Install **Cleaning History Card** and reload the frontend.

### Manual

1. Copy `cleaning-history-card.js` to `<config>/www/cleaning-history-card.js`.
2. Add it as a Lovelace resource: **Settings → Dashboards → Resources → Add Resource**, URL `/local/cleaning-history-card.js`, type **JavaScript Module**.

## Configuration

```yaml
type: custom:cleaning-history-card
entity: camera.l10s_pro_ultra_heat_map
title: Cleaning History
```

| Option      | Type   | Required | Default                   | Description                                                                 |
| ----------- | ------ | -------- | -------------------------- | ----------------------------------------------------------------------------- |
| `entity`    | string | yes      | -                           | The camera entity holding the history attribute.                              |
| `title`     | string | no       | entity's friendly name     | Card header title.                                                            |
| `attribute` | string | no       | `cleaning_history_picture` | Entity attribute to read the history from (e.g. `cruising_history_picture` or `recovery_map_picture`). |

The card lists every key of the chosen attribute in a dropdown (newest first, matching the entity's own ordering) and displays the corresponding image below it. Click the image to open it full-size in a new tab.

## Development

```sh
npm install
npm run build   # builds cleaning-history-card.js
npm run watch    # rebuilds on change
```
