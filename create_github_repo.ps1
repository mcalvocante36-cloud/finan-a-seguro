<#
create_github_repo.ps1
Script para:
- verificar/instalar Git (opcional via winget)
- configurar nome/email do Git global se necessário
- inicializar repositório Git local (branch main)
- fazer commit inicial
- criar repositório no GitHub usando GitHub CLI (`gh`) quando disponível
- caso `gh` não esteja disponível, mostra instruções para adicionar remote manualmente

Como usar:
Abra o PowerShell na pasta do projeto e execute:

    pwsh -ExecutionPolicy Bypass -File .\create_github_repo.ps1

ou

    .\create_github_repo.ps1

#>

function Write-Info($msg){ Write-Host "[INFO]  $msg" -ForegroundColor Cyan }
function Write-Succ($msg){ Write-Host "[OK]    $msg" -ForegroundColor Green }
function Write-Warn($msg){ Write-Host "[WARN]  $msg" -ForegroundColor Yellow }
function Write-Err($msg){ Write-Host "[ERR]   $msg" -ForegroundColor Red }

# 1) Verifica se está na pasta do projeto
$cwd = Get-Location
Write-Info "Pasta atual: $cwd"

# 2) Verifica git
try{
    git --version | Out-Null
    $gitExists = $true
}catch{
    $gitExists = $false
}

if(-not $gitExists){
    Write-Warn "Git não encontrado no PATH. Deseja instalar via winget? (requer Windows + winget) [S/n]"
    $installGit = Read-Host
    if($installGit -in @('','s','S','y','Y')){
        try{
            Write-Info "Tentando instalar Git via winget..."
            winget install --id Git.Git -e --source winget
            Write-Info "Instalação iniciada. Verifique se o Git foi instalado e reexecute este script se necessário."
            exit 0
        }catch{
            Write-Warn "Falha ao instalar com winget. Instale manualmente em https://git-scm.com/downloads e reexecute o script."
            exit 1
        }
    }else{
        Write-Err "Git é necessário para continuar. Instale e rode o script novamente."
        exit 1
    }
} else {
    Write-Succ "Git encontrado."
}

# 3) Configurar user.name e user.email se não existirem
$userName = git config --global user.name
$userEmail = git config --global user.email

if(-not $userName){
    $inputName = Read-Host "Digite seu nome para o Git (ex: Marcos Silva)"
    if($inputName){ git config --global user.name "$inputName"; Write-Succ "user.name configurado." }
}
if(-not $userEmail){
    $inputEmail = Read-Host "Digite seu email para o Git (ex: voce@exemplo.com)"
    if($inputEmail){ git config --global user.email "$inputEmail"; Write-Succ "user.email configurado." }
}

# 4) Inicializar repositório se necessário
if(-not (Test-Path .git)){
    Write-Info "Inicializando repositório Git local..."
    git init
    git checkout -b main 2>$null | Out-Null
    Write-Succ "Repositório inicializado."
} else {
    Write-Info "Repositório Git já existe." 
}

# 5) Adicionar e commitar
Write-Info "Adicionando arquivos e criando commit inicial..."
git add .
$commitResult = $null
try{
    git commit -m "Initial commit: projeto financeiro" | Out-Null
    Write-Succ "Commit criado."
}catch{
    Write-Warn "Não foi possível criar commit talvez não haja alterações ou commit anterior já existe."
}

# 6) Verifica GitHub CLI (gh)
$ghExists = $false
try{ gh --version | Out-Null; $ghExists = $true }catch{ $ghExists = $false }

if($ghExists){
    Write-Info "GitHub CLI (gh) detectado. Deseja criar o repositório no GitHub agora? [S/n]"
    $useGh = Read-Host
    if($useGh -in @('','s','S','y','Y')){
        $repoName = Read-Host "Nome do repositório no GitHub (ex: financeiro-seguro)"
        if(-not $repoName){ Write-Err "Nome do repositório obrigatório."; exit 1 }
        $visibility = Read-Host "Visibilidade (public/private) [public]"
        if(-not $visibility){ $visibility = 'public' }
        try{
            Write-Info "Criando repositório no GitHub..."
            gh repo create $repoName --$visibility --source=. --remote=origin --push
            Write-Succ "Repositório criado e push realizado."
        }catch{
            Write-Err "Falha ao criar repositório com gh. Mensagem: $_"
            exit 1
        }
    }else{
        Write-Info "Pulei a criação via gh. Você pode adicionar o remote manualmente depois."
    }
} else {
    Write-Warn "GitHub CLI não detectado. Para criar o repo automaticamente instale o 'gh' (https://cli.github.com/) ou crie o repositório pelo site e adicione o remote manualmente."
    Write-Info "Se você já criou o repositório no GitHub, cole a URL remota (ex: https://github.com/SEU_USUARIO/financeiro-seguro.git) e será feito o push. Se vazio, nada será enviado."
    $remoteUrl = Read-Host "URL remota (ou Enter para pular)"
    if($remoteUrl){
        try{
            git remote add origin $remoteUrl
            git push -u origin main
            Write-Succ "Push concluído para $remoteUrl"
        }catch{
            Write-Err "Falha no push: $_"
        }
    } else {
        Write-Info "Nenhuma URL informada. Você pode enviar manualmente mais tarde: git remote add origin <URL> ; git push -u origin main"
    }
}

Write-Succ "Script finalizado. Verifique o repositório remoto no GitHub." 
