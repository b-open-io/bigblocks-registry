# Changelog

## 0.0.40

### Added

- New CLI for adding BigBlocks Bitcoin UI blocks to shadcn projects
- `npx bigblocks add <block>` — install blocks with registry URL baked in
- `npx bigblocks list [category]` — browse 30 available blocks by category
- `npx bigblocks info <block>` — show install methods and docs link
- Auto-detects package manager (bun/pnpm/yarn/npm)
- Shows both primary (`npx bigblocks add`) and secondary (`bunx shadcn add`) install methods
- Zero dependencies, 7KB bundle

### Changed

- Complete rewrite from monolithic component library to thin registry CLI wrapper
- Blocks are now installed individually via shadcn CLI, not bundled as one package
