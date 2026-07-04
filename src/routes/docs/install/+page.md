# Installation

Prebuilt binaries for macOS (arm64/x86_64), Linux (x64/arm64, glibc and fully static musl), and Windows (x64) are on the [releases page](https://github.com/BoxingOctopusCreative/linguo/releases).

On musl systems (Alpine and friends), Python, Ruby, Rust, and Terraform/OpenTofu work natively. Node.js and Go publish no official musl builds, so Linguo points you at the distro package instead. On Windows, Ruby comes from [RubyInstaller](https://rubyinstaller.org) archives (without the MSYS2 devkit, so gems with C extensions need a separate toolchain).

## PICK YOUR CHANNEL

### Quick Install via Curl (macOS/Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/BoxingOctopusCreative/linguo/main/install.sh | sh
```

> The install script detects your platform, downloads the latest release tarball, verifies its checksum, and installs the binary to `~/.local/bin`. Override the destination with `LINGUO_INSTALL_DIR`, or pin a version with `LINGUO_VERSION=1.2.0` (or `sh install.sh 1.2.0`).

- - -

### Cargo (Native Rust Package Manager)

#### via Crates.io

```bash
cargo install linguo
```

#### Build from source

```bash
git clone https://github.com/BoxingOctopusCreative/linguo.git
cd linguo
cargo install --path .
```

- - -

### macOS

#### Homebrew

```bash
brew tap boxingoctopuscreative/tap && brew install linguo
```

#### Release tarball (Intel or Apple silicon)

1. Open [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases) and download the tarball for your Mac:
   - Apple silicon: `linguo-<version>-aarch64-apple-darwin.tar.gz`
   - Intel: `linguo-<version>-x86_64-apple-darwin.tar.gz`
2. Extract the archive and move the `linguo` binary onto your `PATH`:

```bash
tar xzf linguo-*-apple-darwin.tar.gz
sudo install -m 755 linguo /usr/local/bin/linguo
```

- - -

### Linux

#### Debian / Ubuntu (Standalone Package Installation)

1. Download the `.deb` for your architecture from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases):
   - x64 (glibc): `linguo-<version>-x86_64-unknown-linux-gnu.deb`
   - arm64 (glibc): `linguo-<version>-aarch64-unknown-linux-gnu.deb`
2. Install the package:

```bash
sudo dpkg -i linguo-*-unknown-linux-gnu.deb
```

> If `dpkg` reports missing dependencies, run `sudo apt-get install -f`.

#### Ubuntu (Via the BOC Engineering PPA)

```bash
sudo add-apt-repository ppa:boxingoctopuscreative/ppa
sudo apt install linguo
```

#### Fedora / RHEL (.rpm)

1. Download the `.rpm` for your architecture from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases):
   - x64: `linguo-<version>-x86_64-unknown-linux-gnu.rpm`
   - arm64: `linguo-<version>-aarch64-unknown-linux-gnu.rpm`
2. Install the package:

```bash
sudo rpm -i linguo-*-unknown-linux-gnu.rpm
```

On Fedora, you can also use:

```bash
sudo dnf install ./linguo-*-unknown-linux-gnu.rpm
```

#### Generic tarball (glibc or musl)

If your distro is not covered by the `.deb` or `.rpm` packages, use the tarball:

1. Download the matching archive from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases):
   - glibc x64/arm64: `linguo-<version>-<arch>-unknown-linux-gnu.tar.gz`
   - musl x64/arm64: `linguo-<version>-<arch>-unknown-linux-musl.tar.gz`
2. Extract and install the binary:

```bash
tar xzf linguo-*-linux-*.tar.gz
sudo install -m 755 linguo /usr/local/bin/linguo
```

Each release asset has a matching `.sha256` file if you want to verify the download before installing.

- - -

### Windows

#### MSI installer (recommended)

1. Download `linguo-<version>-x86_64-pc-windows-msvc.msi` from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases).
2. Run the installer and follow the prompts. It adds `linguo` to your `PATH`.
3. Open a new terminal and confirm the install:

```powershell
linguo --version
```

#### Zip archive

1. Download `linguo-<version>-x86_64-pc-windows-msvc.zip` from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases).
2. Extract the archive to a permanent location, for example `C:\Tools\linguo`.
3. Add that folder to your user `PATH`:
   - Open **Settings → System → About → Advanced system settings → Environment Variables**
   - Under **User variables**, edit **Path** and add the folder containing `linguo.exe`
4. Open a new terminal and confirm the install:

```powershell
linguo --version
```

#### Chocolatey

```powershell
choco install linguo
```

## Shell hook

Add the shell hook to your rc file so pinned runtimes activate automatically when you `cd` into a project:

```bash
eval "$(linguo activate zsh)"   # or bash / fish
```

On Windows (PowerShell), add this to your `$PROFILE`:

```powershell
linguo activate powershell | Out-String | Invoke-Expression
```

## Auto-install (optional)

By default, the shell hook does not download missing toolchains. You can enable auto-install in your global config:

```toml
# ~/.linguo/config.toml
[settings]
auto-install = true
```

When enabled, `cd` into a project with unsatisfied pins and Linguo installs the required toolchains on the spot. Failed attempts back off for 5 minutes so an unreachable upstream never stalls your prompt.
