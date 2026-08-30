#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: >
  Metin2 PvP server tanıtım sitesi (frontend-only, React + localStorage mock).
  v1.1 eklemeleri: (1) Header profil/uygulama dropdown hover bug fix (tıklamadan kapanıyordu),
  (2) VIP sistemi - VIP serverler listenin üstünde altın çerçeveli, (3) üstte yan yana 2 reklam
  bannerı, (4) sağ/sol dikey "sayfa giydirme" bannerları, (5) Reklam Fiyatları sayfası.

frontend:
  - task: "Header dropdown click-toggle bug fix (profil & uygulamalar menüsü)"
    implemented: true
    working: true
    file: "frontend/src/components/Header.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Bug: mouse profil/isim üzerine gelince menü tıklanamadan kapanıyordu. Fix: hover yerine click-toggle + dışarı tıklayınca kapanma (useRef + mousedown listener). Doğrulanması gereken: Kullanıcı giriş yaptıktan sonra (mert/123456) header'daki kullanıcı pill'ine tıklayınca dropdown açılmalı ve AÇIK KALMALI; 'Profilim' butonuna tıklanabilmeli ve /profil'e gitmeli. Aynı şekilde sol üstteki 9-nokta uygulamalar menüsü tıklayınca açılıp 'Reklam Fiyatları' tıklanabilmeli."
        -working: true
        -agent: "testing"
        -comment: "✅ CRITICAL BUG FIX VERIFIED! Tested login with mert/123456 successfully. User dropdown: Opens on click, STAYS OPEN (no premature closing), 'Profilim' button clickable, navigates to /profil correctly. Apps dropdown: Opens on click, STAYS OPEN, 'Reklam Fiyatları' button clickable, navigates to /reklam-fiyatlari correctly. Outside click closes dropdown as expected. The hover bug is completely fixed - dropdowns now use click-toggle with proper outside-click-to-close behavior."
  - task: "VIP sistemi - VIP serverler üstte altın çerçeveli"
    implemented: true
    working: true
    file: "frontend/src/pages/Home.jsx, frontend/src/components/ServerRow.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Anasayfada 'VIP Öne Çıkan Serverler' bölümü normal listenin üstünde görünmeli; VIP serverlerde altın çerçeve + '👑 VIP' rozeti olmalı (DragonPvP, PhoenixMT2)."
        -working: true
        -agent: "testing"
        -comment: "✅ VIP system working correctly. VIP section '👑 VIP Öne Çıkan Serverler' appears ABOVE 'Son Eklenen PVP Serverler' section. Found 2 VIP server cards with gold frame (srv-vip class) and '👑 VIP' badge. Both DragonPvP and PhoenixMT2 are visible as VIP servers with proper styling."
  - task: "Reklam Fiyatları sayfası ve üst/yan bannerlar"
    implemented: true
    working: true
    file: "frontend/src/pages/ReklamFiyatlari.jsx, frontend/src/components/Footer.jsx, frontend/src/components/HomeSections.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "/reklam-fiyatlari sayfası fiyat kartlarını göstermeli (VIP 500 TL 'EN POPÜLER'). Anasayfada mode kartlarının altında 2 üst banner, sağ/sol dikey banner olmalı. Header 'Reklam Fiyatları' linki bu sayfaya gitmeli."
        -working: true
        -agent: "testing"
        -comment: "✅ All advertising features working. /reklam-fiyatlari page displays correctly with pricing grid showing 12 pricing cards. VIP Server Bölümü card shows '500 TL' with 'EN POPÜLER' ribbon. All 12 cards have green 'Mesaj Gönder' buttons. Homepage has 2 horizontal top banners (side-by-side) with 'REKLAM' tags. Left and right vertical side banners (2 total) with 'REKLAM' tags and CTA links are visible. Navigation from apps dropdown to /reklam-fiyatlari works correctly."
  - task: "Voting functionality"
    implemented: true
    working: true
    file: "frontend/src/components/ServerRow.jsx"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        -working: true
        -agent: "testing"
        -comment: "✅ Voting system working. 'Beğen' button clickable without login. Success toast 'Oyunuz kaydedildi! Teşekkürler.' appears after voting. Button changes to 'Oy Verildi' and becomes disabled after voting. Like count increments correctly."

metadata:
  created_by: "main_agent"
  version: "1.1"
  test_sequence: 2
  run_ui: true

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    -agent: "main"
    -message: "Lütfen öncelikle bildirilen dropdown bug'ını doğrula: giriş yap (mert/123456), header kullanıcı menüsünü tıkla, açık kaldığını ve 'Profilim'e tıklanabildiğini doğrula. Ardından VIP bölümü ve /reklam-fiyatlari sayfasını kontrol et. Uygulama frontend-only, localStorage tabanlı (backend yok)."
    -agent: "testing"
    -message: "✅ ALL TESTS PASSED! Critical dropdown bug fix verified successfully. User and apps dropdowns now work correctly with click-toggle behavior. VIP system displays properly with VIP servers above normal servers. All banners (2 top horizontal, 2 side vertical) are visible. Reklam Fiyatları page shows all pricing cards including VIP option at 500 TL with EN POPÜLER ribbon. Voting functionality works correctly. No major issues found. Ready for production."
