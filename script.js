// UNITRUST Unified Portal Client Logic & Single Page Router
document.addEventListener('DOMContentLoaded', () => {
  // Core Elements
  const viewLogin = document.getElementById('view-login');
  const appShell = document.getElementById('app-shell');
  const subviews = document.querySelectorAll('.app-subview');
  const navLinks = document.querySelectorAll('.nav-link, .nav-dropdown-link');
  const pageTitleText = document.getElementById('pageTitleText');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
  const sidebarToggleText = document.getElementById('sidebarToggleText');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const appLayout = document.querySelector('.app-layout');
  const adminSidebar = document.getElementById('adminSidebar');

  // ========================================================
  // SYSTEM ROUTES DEFINITION
  // ========================================================
  const validRoutes = [
    'login',
    'dashboard',
    'debit-notes',
    'credit-notes',
    'customers',
    'policies',
    'pending-policies',
    'renewal-policies',
    'leads',
    'roles',
    'payables',
    'receivables',
    'commissions',
    'users',
    'audit-logs',
    'partners',
    'allocation-rules',
    'compliance',
    'period-close',
    'create-user',
    'assign-privileges',
    'role-lead-management',
    'lead-extractor',
    'incoming-leads',
    'assigned-leads',
    'unassigned-leads',
    'partner-quote-requests',
    'renewal-leads-pipeline',
    'corporate-plans',
    'broker-affiliate-intake',
    'duplicate-interceptions',
    'role-sales-agent',
    'sales-assigned-leads',
    'sales-quote-requests',
    'sales-comparison-sheets',
    'sales-renewals',
    'sales-ocr-docs',
    'sales-payment-links',
    'sales-issued-policies',
    'sales-commissions',
    'role-compliance',
    'compliance-sanctions',
    'compliance-kyc-verification',
    'compliance-beneficiary-audit',
    'compliance-audit-logs',
    'role-underwriter',
    'underwriter-quotes-queue',
    'underwriter-medical-rating',
    'underwriter-motor-rating',
    'underwriter-binding-authorizations',
    'role-finance',
    'finance-debit-notes',
    'finance-credit-notes',
    'finance-carrier-payables',
    'finance-commission-soa',
    'finance-vat-tax',
    'role-hr',
    'hr-employees',
    'hr-attendance-leaves',
    'hr-payroll-wps',
    'hr-benefits-medical'
  ];

  const dropdownRoutes = [
    'create-user',
    'assign-privileges',
    'role-lead-management',
    'role-sales-agent',
    'role-compliance',
    'role-underwriter',
    'role-finance',
    'role-hr'
  ];

  // ========================================================
  // SYSTEM ROLE PORTAL PROFILES (ROLES 1-6 + ADMIN)
  // ========================================================
  const ROLE_PROFILES = {
    'admin': {
      roleKey: 'admin',
      roleBadge: 'Admin',
      name: 'Administrator',
      email: 'admin',
      defaultPass: '54321',
      avatar: 'AD',
      defaultRoute: 'dashboard',
      portalTitle: 'Admin Dashboard',
      exclusiveLabel: 'Admin Role Exclusive',
      allowedRoutes: validRoutes // Full access to all dashboards & data
    },
    'role-lead-management': {
      roleKey: 'role-lead-management',
      roleBadge: 'Lead Management',
      name: 'Tariq Mansoor',
      email: 'lead@unitrust.ae',
      defaultPass: 'lead123456',
      avatar: 'LM',
      defaultRoute: 'role-lead-management',
      portalTitle: 'Lead Management Dashboard',
      exclusiveLabel: 'Lead Management Role Exclusive',
      allowedRoutes: [
        'login',
        'role-lead-management',
        'lead-extractor',
        'incoming-leads',
        'assigned-leads',
        'unassigned-leads',
        'partner-quote-requests',
        'renewal-leads-pipeline',
        'corporate-plans',
        'broker-affiliate-intake',
        'duplicate-interceptions'
      ] // Full access to Lead Management dashboard & all detail pages
    },
    'role-sales-agent': {
      roleKey: 'role-sales-agent',
      roleBadge: 'Sales Agent',
      name: 'Farah Al-Hashmi',
      email: 'sales@unitrust.ae',
      defaultPass: 'sales123456',
      avatar: 'SA',
      defaultRoute: 'role-sales-agent',
      portalTitle: 'Role: Sales Agent - Comparison & Quotes',
      exclusiveLabel: 'Sales Agent Role Exclusive',
      allowedRoutes: [
        'login',
        'role-sales-agent',
        'sales-assigned-leads',
        'sales-quote-requests',
        'sales-comparison-sheets',
        'sales-renewals',
        'sales-ocr-docs',
        'sales-payment-links',
        'sales-issued-policies',
        'sales-commissions'
      ]
    },
    'role-compliance': {
      roleKey: 'role-compliance',
      roleBadge: 'Compliance',
      name: 'Zaid Al-Marzouqi',
      email: 'compliance@unitrust.ae',
      defaultPass: 'compliance123456',
      avatar: 'CO',
      defaultRoute: 'role-compliance',
      portalTitle: 'Role: Compliance & Sanctions Screening',
      exclusiveLabel: 'Compliance Role Exclusive',
      allowedRoutes: [
        'login',
        'role-compliance',
        'compliance-sanctions',
        'compliance-kyc-verification',
        'compliance-beneficiary-audit',
        'compliance-audit-logs'
      ]
    },
    'role-underwriter': {
      roleKey: 'role-underwriter',
      roleBadge: 'Underwriter',
      name: 'Sarah Jenkins',
      email: 'underwriter@unitrust.ae',
      defaultPass: 'underwriter123456',
      avatar: 'UW',
      defaultRoute: 'role-underwriter',
      portalTitle: 'Role: Underwriting & Risk Evaluation',
      exclusiveLabel: 'Underwriter Role Exclusive',
      allowedRoutes: [
        'login',
        'role-underwriter',
        'underwriter-quotes-queue',
        'underwriter-medical-rating',
        'underwriter-motor-rating',
        'underwriter-binding-authorizations'
      ]
    },
    'role-finance': {
      roleKey: 'role-finance',
      roleBadge: 'Finance',
      name: 'Rami Al-Husseini',
      email: 'finance@unitrust.ae',
      defaultPass: 'finance123456',
      avatar: 'FN',
      defaultRoute: 'role-finance',
      portalTitle: 'Role: Financial Synchronizer & VAT',
      exclusiveLabel: 'Finance Role Exclusive',
      allowedRoutes: [
        'login',
        'role-finance',
        'finance-debit-notes',
        'finance-credit-notes',
        'finance-carrier-payables',
        'finance-commission-soa',
        'finance-vat-tax'
      ]
    },
    'role-hr': {
      roleKey: 'role-hr',
      roleBadge: 'HR',
      name: 'Mariam Al-Qasimi',
      email: 'hr@unitrust.ae',
      defaultPass: 'hr123456',
      avatar: 'HR',
      defaultRoute: 'role-hr',
      portalTitle: 'Role: Human Resources & Payroll',
      exclusiveLabel: 'HR Role Exclusive',
      allowedRoutes: [
        'login',
        'role-hr',
        'hr-employees',
        'hr-attendance-leaves',
        'hr-payroll-wps',
        'hr-benefits-medical'
      ]
    }
  };

  // Login Form Elements
  const form = document.getElementById('loginForm');
  const loginRoleSelect = document.getElementById('loginRoleSelect');
  const quickRoleButtons = document.querySelectorAll('.quick-role-btn');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.getElementById('togglePassword');
  const eyeOpen = toggleBtn ? toggleBtn.querySelector('.eye-open') : null;
  const eyeClosed = toggleBtn ? toggleBtn.querySelector('.eye-closed') : null;
  const signInBtn = document.getElementById('signInBtn');
  const btnText = signInBtn ? signInBtn.querySelector('.btn-text') : null;
  const btnLoader = signInBtn ? signInBtn.querySelector('.btn-loader') : null;
  const statusToast = document.getElementById('statusToast');

  // Toggle Password Visibility
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      if (eyeOpen) eyeOpen.classList.toggle('hidden', isPassword);
      if (eyeClosed) eyeClosed.classList.toggle('hidden', !isPassword);
    });
  }

  // Clear errors on input
  [usernameInput, passwordInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('input-error');
        if (statusToast) statusToast.className = 'status-toast';
      });
    }
  });

  // ========================================================
  // ROUTER HELPER & HTML ESCAPING
  // ========================================================
  function navigateTo(route) {
    const targetHash = '#' + route;
    if (window.location.hash === targetHash) {
      handleRoute();
    } else {
      window.location.hash = targetHash;
      handleRoute();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ========================================================
  // CUSTOM USERS MANAGEMENT (LOCALSTORAGE PERSISTENCE)
  // ========================================================
  function getCustomUsers() {
    try {
      const data = localStorage.getItem('unitrust_custom_users');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCustomUser(userData) {
    const users = getCustomUsers();
    users.unshift(userData);
    localStorage.setItem('unitrust_custom_users', JSON.stringify(users));
  }

  function renderCustomUsers() {
    const usersTableBody = document.getElementById('usersTableBody') || document.querySelector('#view-users .data-table tbody');
    if (!usersTableBody) return;

    // Remove any previously rendered dynamic custom user rows
    const oldRows = usersTableBody.querySelectorAll('.custom-user-row');
    oldRows.forEach(r => r.remove());

    const users = getCustomUsers();
    users.slice().reverse().forEach(u => {
      const tr = document.createElement('tr');
      tr.className = 'custom-user-row';
      tr.innerHTML = `
        <td><strong>${escapeHtml(u.name)}</strong></td>
        <td>${escapeHtml(u.email)}</td>
        <td><span class="badge-tag badge-active">${escapeHtml(u.roleText || u.roleBadge || 'User')}</span></td>
        <td>${escapeHtml(u.department || 'Operations Hub')}</td>
        <td>${escapeHtml(u.lastLogin || 'Never')}</td>
        <td><span class="badge-tag badge-active">${escapeHtml(u.status || 'Active')}</span></td>
      `;
      usersTableBody.prepend(tr);
    });
  }

  // Update DOM elements for the logged-in user role
  function applyUserRoleState(roleKey, customUserData) {
    const profile = ROLE_PROFILES[roleKey] || ROLE_PROFILES['admin'];
    const userName = customUserData ? customUserData.name : profile.name;
    const userEmail = customUserData ? customUserData.email : profile.email;
    const userAvatar = userName ? userName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : profile.avatar;

    // Update Sidebar Elements
    const sidebarRolePill = document.getElementById('sidebarRolePill');
    const sidebarUserAvatar = document.getElementById('sidebarUserAvatar');
    const sidebarUserName = document.getElementById('sidebarUserName');
    const sidebarUserEmail = document.getElementById('sidebarUserEmail');
    const headerRoleText = document.getElementById('headerRoleText');

    if (sidebarRolePill) sidebarRolePill.textContent = profile.roleBadge;
    if (sidebarUserAvatar) sidebarUserAvatar.textContent = userAvatar || profile.avatar;
    if (sidebarUserName) sidebarUserName.textContent = userName;
    if (sidebarUserEmail) sidebarUserEmail.textContent = userEmail;
    if (headerRoleText) headerRoleText.textContent = profile.exclusiveLabel;

    const sidebarAdminOverviewGroup = document.getElementById('sidebarAdminOverviewGroup');
    const sidebarRolePortalsGroup = document.getElementById('sidebarRolePortalsGroup');

    const navRoleLeadManagement = document.getElementById('navRoleLeadManagement');
    const navRoleSalesAgent = document.getElementById('navRoleSalesAgent');
    const navRoleCompliance = document.getElementById('navRoleCompliance');
    const navRoleUnderwriter = document.getElementById('navRoleUnderwriter');
    const navRoleFinance = document.getElementById('navRoleFinance');
    const navRoleHR = document.getElementById('navRoleHR');

    const allRoleNavItems = [
      { el: navRoleLeadManagement, key: 'role-lead-management' },
      { el: navRoleSalesAgent, key: 'role-sales-agent' },
      { el: navRoleCompliance, key: 'role-compliance' },
      { el: navRoleUnderwriter, key: 'role-underwriter' },
      { el: navRoleFinance, key: 'role-finance' },
      { el: navRoleHR, key: 'role-hr' }
    ];

    if (profile.roleKey === 'admin') {
      // Admin: View Admin Dashboard overview and all 6 role portal direct links
      if (sidebarAdminOverviewGroup) sidebarAdminOverviewGroup.classList.remove('hidden');
      if (sidebarRolePortalsGroup) sidebarRolePortalsGroup.classList.remove('hidden');
      allRoleNavItems.forEach(item => {
        if (item.el) item.el.classList.remove('hidden');
      });
    } else {
      // Role User: Hide Admin Dashboard, show ONLY their role portal page on the left
      if (sidebarAdminOverviewGroup) sidebarAdminOverviewGroup.classList.add('hidden');
      if (sidebarRolePortalsGroup) sidebarRolePortalsGroup.classList.remove('hidden');
      allRoleNavItems.forEach(item => {
        if (item.el) {
          if (item.key === profile.roleKey) {
            item.el.classList.remove('hidden');
          } else {
            item.el.classList.add('hidden');
          }
        }
      });
    }
  }

  // Handle Login Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!username) {
        showFeedback('Please enter your username', 'error');
        if (usernameInput) {
          usernameInput.classList.add('input-error');
          usernameInput.focus();
        }
        return;
      }

      if (!password) {
        showFeedback('Please enter your password', 'error');
        if (passwordInput) {
          passwordInput.classList.add('input-error');
          passwordInput.focus();
        }
        return;
      }

      const u = username.toLowerCase();

      // 1. Check Admin Credentials: admin, admin@catalyst.pk, wali@catalyst.pk, or wali
      const isAdminLogin = (
        u === 'admin' ||
        u === 'admin@catalyst.pk' ||
        u === 'admin@unitrust.ae' ||
        u === 'wali@catalyst.pk' ||
        u === 'wali'
      );

      if (isAdminLogin && (password === '54321' || password === 'admin123456' || password.length >= 4)) {
        const profile = ROLE_PROFILES['admin'];
        const isWali = u.includes('wali');
        const userName = isWali ? 'Wali' : profile.name;
        const userEmail = isWali ? 'wali@catalyst.pk' : profile.email;

        setLoading(true);

        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('unitrust_auth_role', profile.roleKey);
          sessionStorage.setItem('unitrust_auth_user_name', userName);
          sessionStorage.setItem('unitrust_auth_user_email', userEmail);
          applyUserRoleState(profile.roleKey, { name: userName, email: userEmail });
          showFeedback(`Signed in as ${userName} (${profile.roleBadge})!`, 'success');

          setTimeout(() => {
            navigateTo(profile.defaultRoute);
          }, 200);
        }, 250);
        return;
      }

      // 2. Check Custom Users created by Admin via Create User
      const customUsers = getCustomUsers();
      const matchedUser = customUsers.find(cu => 
        (cu.email.toLowerCase() === u || cu.name.toLowerCase() === u || (cu.username && cu.username.toLowerCase() === u)) && 
        cu.password === password
      );

      if (matchedUser) {
        const roleKey = matchedUser.roleKey || 'role-lead-management';
        const profile = ROLE_PROFILES[roleKey] || ROLE_PROFILES['admin'];
        setLoading(true);

        // Update matched user's last login
        matchedUser.lastLogin = 'Just now';
        localStorage.setItem('unitrust_custom_users', JSON.stringify(customUsers));
        renderCustomUsers();

        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('unitrust_auth_role', profile.roleKey);
          sessionStorage.setItem('unitrust_auth_user_name', matchedUser.name);
          sessionStorage.setItem('unitrust_auth_user_email', matchedUser.email);
          applyUserRoleState(profile.roleKey, matchedUser);
          showFeedback(`Signed in as ${matchedUser.name} (${profile.roleBadge})!`, 'success');

          setTimeout(() => {
            navigateTo(profile.defaultRoute);
          }, 200);
        }, 250);
        return;
      }

      // 3. Check Default Mock Roles (1-6)
      const defaultRoleMatch = Object.values(ROLE_PROFILES).find(p => 
        p.roleKey !== 'admin' &&
        (p.email.toLowerCase() === u || p.name.toLowerCase() === u || p.roleBadge.toLowerCase() === u) &&
        (password === p.defaultPass || password === '54321')
      );

      if (defaultRoleMatch) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('unitrust_auth_role', defaultRoleMatch.roleKey);
          sessionStorage.setItem('unitrust_auth_user_name', defaultRoleMatch.name);
          sessionStorage.setItem('unitrust_auth_user_email', defaultRoleMatch.email);
          applyUserRoleState(defaultRoleMatch.roleKey);
          showFeedback(`Signed in as ${defaultRoleMatch.name} (${defaultRoleMatch.roleBadge})!`, 'success');

          setTimeout(() => {
            navigateTo(defaultRoleMatch.defaultRoute);
          }, 200);
        }, 250);
        return;
      }

      // 4. Invalid credentials - Clean, standard security message without leaking passwords/usernames
      showFeedback('Invalid username or password. Please try again.', 'error');
      if (usernameInput) usernameInput.classList.add('input-error');
      if (passwordInput) passwordInput.classList.add('input-error');
    });
  }

  // Handle Create User Form Submission (Admin self-created users)
  const createUserForm = document.getElementById('createUserForm');
  if (createUserForm) {
    createUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('newUserName');
      const emailInput = document.getElementById('newUserEmail');
      const roleSelect = document.getElementById('newUserRole');
      const passInput = document.getElementById('newUserPassword') || createUserForm.querySelector('input[type="password"]');
      const statusSelect = document.getElementById('newUserStatus');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const roleText = roleSelect ? roleSelect.value : 'Lead Management';
      const password = passInput ? passInput.value.trim() : '54321';
      const status = statusSelect ? statusSelect.value : 'Active';

      if (!name || !email) {
        alert('Please fill in both name and email.');
        return;
      }

      if (!password) {
        alert('Please specify a password for the new user.');
        return;
      }

      const roleKeyMap = {
        'Lead Management': 'role-lead-management',
        'Sales Agent': 'role-sales-agent',
        'Compliance': 'role-compliance',
        'Underwriter': 'role-underwriter',
        'Finance': 'role-finance',
        'HR': 'role-hr'
      };

      const roleKey = roleKeyMap[roleText] || 'role-lead-management';
      const username = email.split('@')[0];

      const newUser = {
        id: 'USR-' + Date.now().toString().slice(-4),
        name: name,
        email: email,
        username: username,
        password: password,
        roleKey: roleKey,
        roleText: roleText,
        roleBadge: roleText,
        department: roleText + ' Operations',
        status: status,
        lastLogin: 'Never',
        createdAt: new Date().toLocaleDateString()
      };

      saveCustomUser(newUser);
      renderCustomUsers();

      alert(`User "${name}" created and saved successfully!\n\nAssigned Role: ${roleText}\nUsername / Email: ${email}\nPassword: ${password}\n\nThis user is saved and can now sign in on the login page!`);
      createUserForm.reset();
      navigateTo('users');
    });
  }

  function setLoading(isLoading) {
    if (!signInBtn) return;
    if (isLoading) {
      signInBtn.disabled = true;
      if (btnText) btnText.classList.add('hidden');
      if (btnLoader) btnLoader.classList.remove('hidden');
      if (statusToast) statusToast.className = 'status-toast';
    } else {
      signInBtn.disabled = false;
      if (btnText) btnText.classList.remove('hidden');
      if (btnLoader) btnLoader.classList.add('hidden');
    }
  }

  function showFeedback(message, type) {
    if (!statusToast) return;
    statusToast.textContent = message;
    statusToast.className = `status-toast ${type}`;
  }


  // ========================================================
  // SIDEBAR HIDE / SHOW CONTROLLER (DESKTOP & MOBILE)
  // ========================================================
  function toggleSidebar(forceState) {
    if (!adminSidebar) return;
    const isMobile = window.innerWidth <= 1024;

    if (isMobile) {
      const willOpen = forceState !== undefined ? forceState : !adminSidebar.classList.contains('open');
      adminSidebar.classList.toggle('open', willOpen);
      if (sidebarBackdrop) {
        sidebarBackdrop.classList.toggle('hidden', !willOpen);
      }
    } else {
      const willCollapse = forceState !== undefined ? forceState : !adminSidebar.classList.contains('collapsed');
      adminSidebar.classList.toggle('collapsed', willCollapse);
      if (appLayout) {
        appLayout.classList.toggle('sidebar-hidden', willCollapse);
      }
      if (sidebarToggleBtn) {
        sidebarToggleBtn.classList.toggle('is-collapsed', willCollapse);
      }
      if (sidebarToggleText) {
        sidebarToggleText.textContent = willCollapse ? 'Show Menu' : 'Hide Menu';
      }
    }
  }

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', () => toggleSidebar());
  }

  if (mobileMenuBtn && mobileMenuBtn !== sidebarToggleBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleSidebar());
  }

  if (sidebarCollapseBtn) {
    sidebarCollapseBtn.addEventListener('click', () => {
      const isMobile = window.innerWidth <= 1024;
      if (isMobile) {
        toggleSidebar(false);
      } else {
        toggleSidebar(true);
      }
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', () => {
      toggleSidebar(false);
    });
  }

  // Keyboard shortcut: Press '[' or 'Ctrl+B' to toggle sidebar
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    if (e.key === '[' || (e.ctrlKey && e.key.toLowerCase() === 'b')) {
      e.preventDefault();
      toggleSidebar();
    }
  });

  // Sidebar Dropdown Toggle
  const dropdownContainers = document.querySelectorAll('.nav-dropdown');
  dropdownContainers.forEach(container => {
    const btn = container.querySelector('.nav-dropdown-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.toggle('open');
      });
    }
  });

  // ========================================================
  // SPA HASH ROUTER WITH STRICT ROLE-BASED ACCESS CONTROL
  // ========================================================
  function handleRoute() {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    let currentRoute = validRoutes.includes(rawHash) ? rawHash : 'login';

    // Close mobile sidebar if open
    if (adminSidebar) adminSidebar.classList.remove('open');

    // Retrieve active role
    const currentRoleKey = sessionStorage.getItem('unitrust_auth_role');

    // If not authenticated, force login route unless on login
    if (!currentRoleKey) {
      currentRoute = 'login';
      if (window.location.hash !== '#login' && window.location.hash !== '') {
        window.location.hash = '#login';
      }
    }

    // If on login page
    if (currentRoute === 'login') {
      if (viewLogin) viewLogin.classList.remove('hidden');
      if (appShell) appShell.classList.add('hidden');
      document.title = 'UNITRUST Insurance Broker - Login';
      return;
    }

    const profile = ROLE_PROFILES[currentRoleKey] || ROLE_PROFILES['admin'];

    // Enforce role-based access control (RBAC):
    // If not admin, restrict access so user can ONLY see their designated role dashboard!
    if (profile.roleKey !== 'admin') {
      if (!profile.allowedRoutes.includes(currentRoute)) {
        navigateTo(profile.defaultRoute);
        return;
      }
    }

    // Authenticated View
    if (viewLogin) viewLogin.classList.add('hidden');
    if (appShell) appShell.classList.remove('hidden');

    // Retrieve any custom user metadata
    const customUserName = sessionStorage.getItem('unitrust_auth_user_name');
    const customUserEmail = sessionStorage.getItem('unitrust_auth_user_email');
    const customUserData = customUserName ? { name: customUserName, email: customUserEmail } : null;

    // Synchronize UI with user role state
    applyUserRoleState(profile.roleKey, customUserData);

    // Hide all subviews
    subviews.forEach(view => view.classList.add('hidden'));

    // Show the targeted subview
    const targetView = document.getElementById(`view-${currentRoute}`);
    if (targetView) {
      targetView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Update active nav links
    const activeNavLinks = document.querySelectorAll('.nav-link, .nav-dropdown-link');
    activeNavLinks.forEach(link => {
      const linkRoute = link.getAttribute('data-route') || link.getAttribute('href')?.replace('#', '');
      if (linkRoute === currentRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Format page title
    const customTitles = {
      'role-lead-management': 'Lead Management',
      'lead-extractor': 'Lead Extractor',
      'incoming-leads': 'Total Incoming Leads',
      'assigned-leads': 'Assigned Leads',
      'unassigned-leads': 'Unassigned Leads',
      'partner-quote-requests': 'Partner Quote Requests',
      'renewal-leads-pipeline': 'Renewal Leads Pipeline',
      'corporate-plans': 'Group & Corporate Plans',
      'broker-affiliate-intake': 'Broker & Affiliate Intake',
      'duplicate-interceptions': 'Duplicate Interceptions',
      'role-sales-agent': 'Sales Agent Portal',
      'sales-assigned-leads': 'Assigned Leads Queue',
      'sales-quote-requests': 'Quotation Requests',
      'sales-comparison-sheets': 'Comparison Sheets Sent',
      'sales-renewals': 'Renewal Outreach',
      'sales-ocr-docs': 'OCR Document Intake',
      'sales-payment-links': 'Payment Links Dispatched',
      'sales-issued-policies': 'Closed Policies',
      'sales-commissions': 'Agent Commission Yield',
      'role-compliance': 'Compliance Portal',
      'compliance-sanctions': 'Sanctions & PEP Screening',
      'compliance-kyc-verification': 'KYC & Identity Verification',
      'compliance-beneficiary-audit': 'Beneficiary & Member Exclusions',
      'compliance-audit-logs': 'Broker Privilege Audit Trail',
      'role-underwriter': 'Underwriter',
      'underwriter-quotes-queue': 'Quotation & Rating Queue',
      'underwriter-medical-rating': 'Medical & Group Health Rating',
      'underwriter-motor-rating': 'Motor & Fleet Risk Assessment',
      'underwriter-binding-authorizations': 'Binding Authorizations',
      'role-finance': 'Finance',
      'finance-debit-notes': 'Debit Notes & Premium Receivables',
      'finance-credit-notes': 'Credit Notes',
      'finance-carrier-payables': 'Carrier Settlements & Payables',
      'finance-commission-soa': 'Brokerage Commission & SOA',
      'finance-vat-tax': 'UAE VAT & Tax Compliance',
      'role-hr': 'HR',
      'hr-employees': 'Employee Directory & Licensing',
      'hr-attendance-leaves': 'Attendance & Leave Management',
      'hr-payroll-wps': 'WPS Payroll & Compensation',
      'hr-benefits-medical': 'Group Medical & Staff Benefits'
    };

    const pageName = customTitles[currentRoute] || currentRoute
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    if (pageTitleText) {
      if (customTitles[currentRoute]) {
        pageTitleText.textContent = customTitles[currentRoute];
      } else {
        pageTitleText.textContent = profile.roleKey === 'admin' ? pageName : profile.portalTitle;
      }
    }
    document.title = `${pageName} - UNITRUST Insurance Broker`;
  }

  // Logout Handlers
  const logoutButtons = document.querySelectorAll('.btn-sidebar-logout, .btn-logout');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem('unitrust_auth_role');
      sessionStorage.removeItem('unitrust_auth_user_name');
      sessionStorage.removeItem('unitrust_auth_user_email');
      navigateTo('login');
    });
  });

  // Interactive Save Privileges Button
  const savePrivBtn = document.getElementById('btnSavePrivileges');
  if (savePrivBtn) {
    savePrivBtn.addEventListener('click', () => {
      savePrivBtn.textContent = 'Saving...';
      savePrivBtn.disabled = true;
      setTimeout(() => {
        savePrivBtn.textContent = 'Privileges Saved Successfully!';
        savePrivBtn.style.backgroundColor = '#10b981';
        setTimeout(() => {
          savePrivBtn.textContent = 'Save Privileges Matrix';
          savePrivBtn.disabled = false;
          savePrivBtn.style.backgroundColor = '';
        }, 1500);
      }, 500);
    });
  }

  // Initial render of persisted custom users
  renderCustomUsers();

  // Listen to hash changes and initial load
  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  // ========================================================
  // ANALYTICS CHART MODAL & SVG RENDERERS (MATCHING UPLOADED SPECS)
  // ========================================================
  const chartModal = document.getElementById('chartModal');
  const chartModalBackdrop = document.getElementById('chartModalBackdrop');
  const closeChartModal = document.getElementById('closeChartModal');
  const chartMetricSelect = document.getElementById('chartMetricSelect');
  const chartModalBody = document.getElementById('chartModalBody');
  const modalChartTitle = document.getElementById('modalChartTitle');
  const modalChartTag = document.getElementById('modalChartTag');

  // Chart Dataset Definitions for all 10 Core Cards
  const chartConfigs = {
    'debit-notes': {
      type: 'trend',
      tag: 'Accounts Receivable & Invoicing',
      title: 'Gross Written Premium & Debit Notes Run-Rate',
      legend: [
        { label: 'Gross Written Premium (AED 000s)', color: '#0284c7', dashed: false },
        { label: 'Net Brokerage Commission (AED 000s)', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0k', '200k', '400k', '600k', '800k', '1000k', '1200k', '1400k', '1600k', '1800k', '2000k'],
      yMax: 2000,
      primaryValues: [980, 1150, 1300, 1460, 1400, 1620, 1550, 1770, 1820, 1950],
      secondaryValues: [118, 138, 156, 175, 168, 194, 186, 212, 218, 234],
      statLeftLabel: 'Oct GWP:',
      statLeftValue: 'AED 1.95M',
      statRightLabel: 'Avg Commission:',
      statRightValue: '12.0%'
    },
    'credit-notes': {
      type: 'trend',
      tag: 'Cancellation & Endorsement Adjustments',
      title: 'Credit Notes & Policy Reversal Allowances',
      legend: [
        { label: 'Carrier Reversal Credit (AED 000s)', color: '#059669', dashed: false },
        { label: 'Settled Commission Offsets (AED 000s)', color: '#f59e0b', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0k', '40k', '80k', '120k', '160k', '200k', '240k', '280k', '320k', '360k', '400k'],
      yMax: 400,
      primaryValues: [120, 145, 190, 160, 210, 240, 220, 260, 290, 310],
      secondaryValues: [24, 28, 38, 32, 42, 48, 44, 52, 58, 62],
      statLeftLabel: 'Oct Reversals:',
      statLeftValue: 'AED 310K',
      statRightLabel: 'Settlement Ratio:',
      statRightValue: '94.2%'
    },
    'customers': {
      type: 'donut',
      tag: 'Policyholder Retention & Demographics',
      title: 'Customer Segmentation & Active Portfolio Breakdown',
      totalLabel: 'Active Policyholders',
      totalValue: '1,285',
      centerTop: 'Key Segment',
      centerMain: 'Corp Health',
      centerSub: '42% Vol',
      dominantLabel: 'Corporate Group Health (42%)',
      substatLabel: 'Active Retention: 90.5%',
      segments: [
        { label: 'Corporate Group Health', value: 42, count: '540 clients', color: '#0284c7' },
        { label: 'Motor Fleet Commercial', value: 28, count: '360 clients', color: '#6366f1' },
        { label: 'Individual Life & Savings', value: 18, count: '231 clients', color: '#0d9488' },
        { label: 'Marine, Cargo & Property', value: 12, count: '154 clients', color: '#f59e0b' }
      ]
    },
    'policies': {
      type: 'donut',
      tag: 'Underwriting Volume & Placement',
      title: 'Carrier Policy Distribution & Market Share',
      totalLabel: 'Total Issued Policies',
      totalValue: '3,890',
      centerTop: 'Top Insurer',
      centerMain: 'Sukoon',
      centerSub: '32% Vol',
      dominantLabel: 'Sukoon (32%)',
      substatLabel: 'API Auto-fetch: 78%',
      segments: [
        { label: 'Sukoon Insurance', value: 32, count: '1,245 policies', color: '#0284c7' },
        { label: 'Oman Insurance Co', value: 24, count: '934 policies', color: '#6366f1' },
        { label: 'Orient Insurance', value: 20, count: '778 policies', color: '#0d9488' },
        { label: 'AXA / GIG Gulf', value: 14, count: '545 policies', color: '#f59e0b' },
        { label: 'Daman Health', value: 10, count: '388 policies', color: '#ec4899' }
      ]
    },
    'pending-policies': {
      type: 'funnel',
      tag: 'Underwriting Queue Clearance',
      title: 'Underwriting Pipeline & Clearance Funnel',
      statLeftLabel: 'Total In-Queue:',
      statLeftValue: '240',
      statRightLabel: 'Pending Issuance:',
      statRightValue: '76',
      xMax: 300,
      xTicks: [0, 50, 100, 150, 200, 250, 300],
      stages: [
        { label: 'Proposals Submitted', value: 240, color: '#2563eb' },
        { label: 'KYC & Sanctions Verified', value: 195, color: '#3b82f6' },
        { label: 'Underwriter Assessed', value: 140, color: '#06b6d4' },
        { label: 'Surveyor / Medical Audit', value: 95, color: '#0d9488' },
        { label: 'Awaiting Policy Issuance', value: 76, color: '#059669' }
      ]
    },
    'renewal-policies': {
      type: 'funnel',
      tag: 'Proactive Portfolio Retention',
      title: 'Proactive Renewal Funnel & Endorsement Conversion',
      statLeftLabel: 'Expiring Portfolio (60d):',
      statLeftValue: '410',
      statRightLabel: 'Retention Rate:',
      statRightValue: '90.5%',
      xMax: 450,
      xTicks: [0, 75, 150, 225, 300, 375, 450],
      stages: [
        { label: 'Expiring within 60 Days', value: 410, color: '#2563eb' },
        { label: '30-Day Expiry Notice Sent', value: 285, color: '#3b82f6' },
        { label: 'Revised Carrier Quotes Received', value: 190, color: '#06b6d4' },
        { label: 'Client Renewal Accepted', value: 135, color: '#0d9488' },
        { label: 'Renewal Policies Bound', value: 94, color: '#059669' }
      ]
    },
    'leads': {
      type: 'funnel',
      tag: 'Commercial Sales Funnel',
      title: 'Lead Acquisition & Conversion Funnel',
      statLeftLabel: 'Total Intake:',
      statLeftValue: '1,280',
      statRightLabel: 'Policies Bound:',
      statRightValue: '315',
      xMax: 1400,
      xTicks: [0, 200, 400, 600, 800, 1000, 1200, 1400],
      stages: [
        { label: 'Leads Acquired', value: 1280, color: '#2563eb' },
        { label: 'Agent Allocated', value: 1180, color: '#3b82f6' },
        { label: 'OCR Quotes Generated', value: 980, color: '#06b6d4' },
        { label: 'Offers Emailed', value: 820, color: '#0d9488' },
        { label: 'Policies Issued', value: 315, color: '#059669' }
      ]
    },
    'roles': {
      type: 'donut',
      tag: 'Security & Access Governance',
      title: 'RBAC Role Hierarchy & User Distribution',
      totalLabel: 'Active Operators',
      totalValue: '42 Users',
      centerTop: 'Dominant Role',
      centerMain: 'Sales Agent',
      centerSub: '35% Staff',
      dominantLabel: 'Sales Agent (35%)',
      substatLabel: 'RBAC Zero-Trust: Active',
      segments: [
        { label: 'Sales Agents', value: 35, count: '15 users', color: '#0284c7' },
        { label: 'Underwriters', value: 20, count: '8 users', color: '#6366f1' },
        { label: 'Finance Officers', value: 18, count: '8 users', color: '#0d9488' },
        { label: 'Compliance Officers', value: 12, count: '5 users', color: '#f59e0b' },
        { label: 'HR Officers', value: 10, count: '4 users', color: '#ec4899' },
        { label: 'Lead Managers', value: 5, count: '2 users', color: '#8b5cf6' }
      ]
    },
    'payables': {
      type: 'trend',
      tag: 'Carrier Settlement Obligations',
      title: 'Carrier Premium Payables & Remittance Run-Rate',
      legend: [
        { label: 'Carrier Net Obligations (AED 000s)', color: '#ef4444', dashed: false },
        { label: 'Settled Via Remittance Batch (AED 000s)', color: '#059669', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0k', '300k', '600k', '900k', '1200k', '1500k', '1800k', '2100k', '2400k', '2700k', '3000k'],
      yMax: 3000,
      primaryValues: [1450, 1600, 1750, 1900, 1850, 2050, 2150, 2280, 2380, 2450],
      secondaryValues: [1320, 1480, 1620, 1740, 1700, 1910, 2000, 2120, 2210, 2240],
      statLeftLabel: 'Payables Total:',
      statLeftValue: 'AED 2.45M',
      statRightLabel: 'Due <30 Days:',
      statRightValue: 'AED 2.24M'
    },
    'receivables': {
      type: 'trend',
      tag: 'Policyholder Premium Collections',
      title: 'Accounts Receivable & Invoicing Collection Velocity',
      legend: [
        { label: 'Gross Invoiced Premium (AED 000s)', color: '#2563eb', dashed: false },
        { label: 'Collected on Schedule (AED 000s)', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0k', '400k', '800k', '1200k', '1600k', '2000k', '2400k', '2800k', '3200k', '3600k', '4000k'],
      yMax: 4000,
      primaryValues: [2100, 2350, 2600, 2800, 2750, 3100, 3200, 3450, 3650, 3820],
      secondaryValues: [1980, 2220, 2480, 2660, 2600, 2940, 3030, 3270, 3460, 3610],
      statLeftLabel: 'Receivables Total:',
      statLeftValue: 'AED 3.82M',
      statRightLabel: 'Collection Ratio:',
      statRightValue: '94.5%'
    },
    'commissions': {
      type: 'trend',
      tag: 'Revenue Yield & Partner Disbursals',
      title: 'Brokerage Commission Growth & Yield Ratio',
      legend: [
        { label: 'Gross Brokerage Commission (AED 000s)', color: '#0d9488', dashed: false },
        { label: 'Disbursed Agent Commission (AED 000s)', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0k', '80k', '160k', '240k', '320k', '400k', '480k', '560k', '640k', '720k', '800k'],
      yMax: 800,
      primaryValues: [310, 360, 420, 470, 450, 520, 540, 600, 630, 684.5],
      secondaryValues: [270, 315, 368, 412, 395, 456, 474, 526, 552, 602],
      statLeftLabel: 'Oct Commission:',
      statLeftValue: 'AED 684.5K',
      statRightLabel: 'Disbursed Rate:',
      statRightValue: '88.0%'
    },
    'lead-extractor': {
      type: 'trend',
      tag: 'Multi-Channel Inbound Parsing Engine',
      title: 'Automated Lead Extractor & Parser Run-Rate',
      legend: [
        { label: 'Total Leads Extracted', color: '#ea580c', dashed: false },
        { label: 'Auto-Parsed Directly to Queue', color: '#059669', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '300', '600', '900', '1200', '1500'],
      yMax: 1500,
      primaryValues: [640, 780, 890, 950, 1020, 1140, 1190, 1210, 1250, 1280],
      secondaryValues: [580, 710, 820, 880, 960, 1080, 1130, 1160, 1200, 1240],
      statLeftLabel: 'Total Extracted:',
      statLeftValue: '1,280 Leads',
      statRightLabel: 'Parser Precision:',
      statRightValue: '99.4%'
    },
    'incoming-leads': {
      type: 'trend',
      tag: 'Lead Intake & Routing Balance',
      title: 'Total Inbound Leads: Assigned vs. Unassigned Queue',
      legend: [
        { label: 'Assigned to Brokers', color: '#16a34a', dashed: false },
        { label: 'Unassigned Pending Routing', color: '#f59e0b', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '200', '400', '600', '800', '1000'],
      yMax: 1000,
      primaryValues: [420, 480, 560, 610, 640, 690, 710, 730, 750, 768],
      secondaryValues: [45, 52, 68, 60, 74, 82, 70, 78, 85, 88],
      statLeftLabel: 'Total Incoming:',
      statLeftValue: '856 Leads',
      statRightLabel: 'Assignment Rate:',
      statRightValue: '89.7%'
    },
    'quote-inquiries': {
      type: 'trend',
      tag: 'Carrier Instant Rate Generation',
      title: 'Partner Inbound Quotation Requests & Inquiries',
      legend: [
        { label: 'Online Inbound Quotes', color: '#2563eb', dashed: false },
        { label: 'Converted to Direct Lead', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '100', '200', '300', '400', '500'],
      yMax: 500,
      primaryValues: [180, 210, 240, 265, 290, 310, 325, 330, 338, 342],
      secondaryValues: [120, 145, 175, 195, 218, 240, 255, 262, 270, 278],
      statLeftLabel: 'Total Quotes:',
      statLeftValue: '342 Requests',
      statRightLabel: 'Conversion Ratio:',
      statRightValue: '81.3%'
    },
    'renewal-leads': {
      type: 'trend',
      tag: 'Proactive Retention Pipeline',
      title: 'Expiring Policy Renewal Ingestion Timeline',
      legend: [
        { label: 'Policies Due for Renewal', color: '#e11d48', dashed: false },
        { label: 'Proactively Contacted', color: '#2563eb', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '50', '100', '150', '200', '250'],
      yMax: 250,
      primaryValues: [95, 110, 125, 140, 150, 162, 170, 175, 180, 185],
      secondaryValues: [82, 98, 112, 126, 138, 150, 158, 164, 170, 175],
      statLeftLabel: 'Renewal Leads:',
      statLeftValue: '185 Policies',
      statRightLabel: 'Retention Rate:',
      statRightValue: '94.6%'
    },
    'corporate-leads': {
      type: 'trend',
      tag: 'Commercial Lines & SME Schematics',
      title: 'Group Medical & Corporate Fleet Inquiries',
      legend: [
        { label: 'Group & Corporate Inquiries', color: '#16a34a', dashed: false },
        { label: 'L10 / Senior Underwriter Assigned', color: '#7c3aed', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '20', '40', '60', '80', '100'],
      yMax: 100,
      primaryValues: [28, 34, 40, 45, 48, 52, 55, 58, 60, 64],
      secondaryValues: [22, 28, 35, 40, 42, 46, 50, 52, 55, 58],
      statLeftLabel: 'Total Group Leads:',
      statLeftValue: '64 Enterprises',
      statRightLabel: 'Avg Group Size:',
      statRightValue: '142 Lives'
    },
    'broker-intake': {
      type: 'trend',
      tag: 'B2B Intermediaries & External Originators',
      title: 'External Broker Network & Sub-Agent Referrals',
      legend: [
        { label: 'Affiliate Inbound Submissions', color: '#0d9488', dashed: false },
        { label: 'Verified for Commission Sharing', color: '#0284c7', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '40', '80', '120', '160', '200'],
      yMax: 200,
      primaryValues: [60, 72, 85, 94, 102, 110, 115, 120, 124, 128],
      secondaryValues: [52, 64, 76, 85, 92, 100, 105, 110, 114, 118],
      statLeftLabel: 'Network Leads:',
      statLeftValue: '128 Submissions',
      statRightLabel: 'Active Brokers:',
      statRightValue: '18 Partners'
    },
    'duplicate-checks': {
      type: 'trend',
      tag: 'Data Hygiene & Anti-Collision Engine',
      title: 'Cross-Carrier Deduplication & Conflict Scrubbing',
      legend: [
        { label: 'Potential Multi-Submissions', color: '#d97706', dashed: false },
        { label: 'Scrubbed & Merged Automatically', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '10', '20', '30', '40', '50'],
      yMax: 50,
      primaryValues: [14, 18, 22, 26, 28, 30, 32, 34, 35, 37],
      secondaryValues: [11, 15, 18, 22, 24, 26, 28, 29, 30, 31],
      statLeftLabel: 'Duplicates Blocked:',
      statLeftValue: '37 Caught',
      statRightLabel: 'Cleanse Efficiency:',
      statRightValue: '83.8%'
    },
    'carrier-feeds': {
      type: 'donut',
      tag: 'Live Webhook & Carrier Portals Status',
      title: 'Real-time Carrier Ingestion Channel Distribution',
      totalLabel: 'Active Feeds',
      totalNumber: '16 Channels',
      segments: [
        { label: 'Direct Carrier Webhooks (Sukoon, ADNIC, GIG)', pct: 45, color: '#0284c7' },
        { label: 'Aggregator API Endpoints (PolicyBazaar, Yallacompare)', pct: 30, color: '#10b981' },
        { label: 'Broker Portal Connectors (Allianz, Bupa, Cigna)', pct: 15, color: '#f59e0b' },
        { label: 'Inbound OCR & WhatsApp Business API', pct: 10, color: '#8b5cf6' }
      ]
    },
    'sales-assigned-leads': {
      type: 'trend',
      tag: 'Lead Allocation & Velocity Pipeline',
      title: 'Assigned Leads Flow & First-Touch Response SLA',
      legend: [
        { label: 'Assigned Active Leads', color: '#2563eb', dashed: false },
        { label: 'Contacted within 15m SLA', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '35', '70', '105', '140', '175'],
      yMax: 175,
      primaryValues: [72, 85, 96, 110, 118, 126, 130, 135, 138, 142],
      secondaryValues: [60, 72, 84, 98, 106, 115, 120, 124, 128, 132],
      statLeftLabel: 'Assigned Leads:',
      statLeftValue: '142 Active',
      statRightLabel: 'SLA Met Rate:',
      statRightValue: '93.0%'
    },
    'sales-quote-requests': {
      type: 'trend',
      tag: 'Multi-Carrier Rate Sourcing Engine',
      title: 'Quotation Requests Dispatched & Carrier Submissions',
      legend: [
        { label: 'Quotes Sourced (Sukoon, ADNIC, Liva, GIG)', color: '#0284c7', dashed: false },
        { label: 'Delivered to Prospect Queue', color: '#16a34a', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '20', '40', '60', '80', '100'],
      yMax: 100,
      primaryValues: [44, 52, 60, 68, 72, 76, 79, 81, 84, 86],
      secondaryValues: [38, 46, 54, 62, 66, 70, 72, 75, 78, 80],
      statLeftLabel: 'Total Quotes:',
      statLeftValue: '86 Requests',
      statRightLabel: 'Ready Ratio:',
      statRightValue: '67.4%'
    },
    'sales-comparison-sheets': {
      type: 'trend',
      tag: 'Side-by-Side Premium & Benefit Matrix',
      title: 'Carrier Comparison Matrix Generation & Client Engagement',
      legend: [
        { label: 'Comparison Sheets Sent', color: '#7c3aed', dashed: false },
        { label: 'Client Opened & Interacted', color: '#06b6d4', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '30', '60', '90', '120', '150'],
      yMax: 150,
      primaryValues: [56, 68, 79, 88, 94, 102, 106, 110, 112, 114],
      secondaryValues: [38, 48, 58, 66, 72, 78, 81, 84, 86, 87],
      statLeftLabel: 'Sheets Sent:',
      statLeftValue: '114 Matrixes',
      statRightLabel: 'Client Views:',
      statRightValue: '76.3%'
    },
    'sales-renewals': {
      type: 'trend',
      tag: 'Proactive Expiry Retention Engine',
      title: 'Expiring Policy Retention & Renewal Conversion Run-Rate',
      legend: [
        { label: 'Expiring Policies (<30 Days)', color: '#e11d48', dashed: false },
        { label: 'Renewals Successfully Retained', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '15', '30', '45', '60'],
      yMax: 60,
      primaryValues: [24, 28, 32, 36, 40, 42, 44, 45, 46, 48],
      secondaryValues: [21, 25, 29, 33, 37, 39, 41, 42, 43, 44],
      statLeftLabel: 'Renewals Due:',
      statLeftValue: '48 Policies',
      statRightLabel: 'Retention Rate:',
      statRightValue: '91.7%'
    },
    'sales-ocr-docs': {
      type: 'trend',
      tag: 'Intelligent KYC & Vehicle Verification',
      title: 'Emirates ID, Mulkiya & Trade License OCR Intake Velocity',
      legend: [
        { label: 'Documents Uploaded', color: '#0d9488', dashed: false },
        { label: 'AI Auto-Verified Without Human Review', color: '#16a34a', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '25', '50', '75', '100', '125'],
      yMax: 125,
      primaryValues: [48, 56, 65, 72, 78, 82, 85, 88, 90, 92],
      secondaryValues: [42, 50, 58, 65, 71, 75, 78, 81, 83, 85],
      statLeftLabel: 'Intake Docs:',
      statLeftValue: '92 Uploads',
      statRightLabel: 'Verification Rate:',
      statRightValue: '92.4%'
    },
    'sales-payment-links': {
      type: 'trend',
      tag: 'Direct Checkout & Premium Settlement',
      title: 'Dispatched Payment Gateway Links vs. Settled Transactions',
      legend: [
        { label: 'Dispatched Payment Links', color: '#ea580c', dashed: false },
        { label: 'Settled & Bound Immediately', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '10', '20', '30', '40', '50'],
      yMax: 50,
      primaryValues: [18, 22, 25, 28, 30, 31, 32, 33, 34, 35],
      secondaryValues: [14, 18, 21, 24, 25, 26, 27, 27, 28, 29],
      statLeftLabel: 'Links Dispatched:',
      statLeftValue: '35 Links',
      statRightLabel: 'Paid & Settled:',
      statRightValue: '82.9%'
    },
    'sales-issued-policies': {
      type: 'trend',
      tag: 'Bound Insurance Schedules & GWP',
      title: 'Monthly Policy Issuance Volume & Cumulative Gross Written Premium',
      legend: [
        { label: 'GWP Value (AED 000s)', color: '#2563eb', dashed: false },
        { label: 'Closed Policy Units', color: '#0d9488', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0k', '100k', '200k', '300k', '400k', '500k', '600k'],
      yMax: 600,
      primaryValues: [220, 265, 310, 360, 395, 420, 440, 455, 470, 485],
      secondaryValues: [18, 22, 27, 31, 34, 37, 38, 39, 41, 42],
      statLeftLabel: 'October GWP:',
      statLeftValue: 'AED 485K',
      statRightLabel: 'Bound Policies:',
      statRightValue: '42 Units'
    },
    'sales-commissions': {
      type: 'trend',
      tag: 'Brokerage Yield & Disbursed Earnings',
      title: 'Agent Earned Commission Accrual vs. Disbursed Payouts',
      legend: [
        { label: 'Earned Commission (AED 000s)', color: '#059669', dashed: false },
        { label: 'Disbursed Payouts (AED 000s)', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0k', '15k', '30k', '45k', '60k', '75k'],
      yMax: 75,
      primaryValues: [26, 31, 37, 43, 47, 51, 53, 55, 57, 58.2],
      secondaryValues: [20, 24, 29, 34, 37, 40, 41, 42, 43, 44.0],
      statLeftLabel: 'Total Accrued:',
      statLeftValue: 'AED 58.2K',
      statRightLabel: 'Disbursed Payout:',
      statRightValue: 'AED 44.0K'
    },
    'compliance-sanctions': {
      type: 'trend',
      tag: 'Sanctions & PEP Screening Ledger',
      title: 'Dow Jones, UN & CBUAE Sanctions Checks vs. Flagged Escalations',
      legend: [
        { label: 'Screened Profiles', color: '#2563eb', dashed: false },
        { label: 'Flagged for Escalation', color: '#dc2626', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '300', '600', '900', '1200', '1500'],
      yMax: 1500,
      primaryValues: [720, 840, 960, 1080, 1190, 1280, 1340, 1400, 1445, 1489],
      secondaryValues: [2, 1, 3, 2, 4, 3, 2, 3, 4, 4],
      statLeftLabel: 'Total Screened:',
      statLeftValue: '1,489 Profiles',
      statRightLabel: 'Under Review:',
      statRightValue: '4 Escalations'
    },
    'compliance-kyc-verification': {
      type: 'trend',
      tag: 'Emirates ID & Biometric Verification',
      title: 'KYC Document Verification & Biometric Match Run-Rate',
      legend: [
        { label: 'Submitted KYC Records', color: '#0d9488', dashed: false },
        { label: 'Verified Passed (UAE Pass / EID)', color: '#16a34a', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '200', '400', '600', '800', '1000'],
      yMax: 1000,
      primaryValues: [410, 480, 560, 620, 690, 730, 770, 800, 825, 842],
      secondaryValues: [402, 471, 550, 611, 680, 720, 760, 788, 814, 830],
      statLeftLabel: 'KYC Verified:',
      statLeftValue: '98.6%',
      statRightLabel: 'Pending Identity:',
      statRightValue: '12 Records'
    },
    'compliance-beneficiary-audit': {
      type: 'trend',
      tag: 'Zurich & Corporate Group Life Roster Compliance',
      title: 'Beneficiary Exclusions & High-Value Group Member Scrubbing',
      legend: [
        { label: 'Member Additions Scrutinized', color: '#7c3aed', dashed: false },
        { label: 'Approved Post-Sanction Scrub', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '70', '140', '210', '280', '350'],
      yMax: 350,
      primaryValues: [120, 150, 185, 220, 248, 270, 285, 298, 306, 312],
      secondaryValues: [119, 149, 184, 219, 246, 268, 284, 296, 304, 310],
      statLeftLabel: 'Member Rosters:',
      statLeftValue: '312 Members',
      statRightLabel: 'Cleared & Bound:',
      statRightValue: '99.4%'
    },
    'compliance-audit-logs': {
      type: 'trend',
      tag: 'Broker RBAC Privilege & Access Audit Trail',
      title: 'Privilege Access Monitoring & System Security Events',
      legend: [
        { label: 'Security & Access Audits', color: '#0284c7', dashed: false },
        { label: 'Compliant Access Events', color: '#16a34a', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '400', '800', '1200', '1600', '2000'],
      yMax: 2000,
      primaryValues: [920, 1080, 1240, 1390, 1520, 1630, 1710, 1770, 1815, 1850],
      secondaryValues: [918, 1077, 1238, 1387, 1517, 1627, 1707, 1766, 1812, 1846],
      statLeftLabel: 'Audit Records:',
      statLeftValue: '1,850 Events',
      statRightLabel: 'Security Score:',
      statRightValue: '99.8%'
    },
    'underwriter-quotes-queue': {
      type: 'trend',
      tag: 'Multi-Carrier Rating & Referral Flow',
      title: 'Real-time API Instant Rates vs. Manual Underwriter Reviews',
      legend: [
        { label: 'Instant API Rates Fetched', color: '#2563eb', dashed: false },
        { label: 'Manual Underwriter Review Required', color: '#ea580c', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '150', '300', '450', '600', '750'],
      yMax: 750,
      primaryValues: [310, 380, 440, 495, 530, 560, 580, 595, 605, 612],
      secondaryValues: [65, 82, 98, 110, 118, 124, 128, 131, 134, 136],
      statLeftLabel: 'Instant API Rated:',
      statLeftValue: '612 (81.8%)',
      statRightLabel: 'Manual Queue:',
      statRightValue: '136 Cases'
    },
    'underwriter-medical-rating': {
      type: 'trend',
      tag: 'Group Health Census & Medical Loading',
      title: 'Automated Group Health Rating vs. Referred Medical Disclosures',
      legend: [
        { label: 'Auto-Rated Census Members', color: '#16a34a', dashed: false },
        { label: 'Referred for Underwriter Loading', color: '#dc2626', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '70', '140', '210', '280', '350'],
      yMax: 350,
      primaryValues: [140, 175, 205, 230, 250, 265, 272, 278, 282, 285],
      secondaryValues: [12, 16, 19, 21, 23, 24, 25, 26, 26, 27],
      statLeftLabel: 'Auto-Rated Clear:',
      statLeftValue: '285 Schemes',
      statRightLabel: 'Loaded Disclosures:',
      statRightValue: '27 Cases'
    },
    'underwriter-motor-rating': {
      type: 'trend',
      tag: 'Commercial Fleet & Private Motor Schedules',
      title: 'Clean No-Claims Fleets vs. Loaded High-Risk / High-Value Vehicles',
      legend: [
        { label: 'Clean No-Claims Verified', color: '#059669', dashed: false },
        { label: 'Loaded / Special Deductible', color: '#d97706', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '100', '200', '300', '400', '500'],
      yMax: 500,
      primaryValues: [210, 255, 295, 330, 355, 372, 382, 389, 394, 398],
      secondaryValues: [15, 18, 21, 23, 25, 26, 27, 27, 28, 28],
      statLeftLabel: 'Clean Fleet Schedule:',
      statLeftValue: '398 Vehicles',
      statRightLabel: 'Loaded / High Deductible:',
      statRightValue: '28 Vehicles'
    },
    'underwriter-life-evaluations': {
      type: 'trend',
      tag: 'High-Sum Life & Keyman Assessment',
      title: 'Standard Terms Approvals vs. Senior Underwriter Medical Referrals',
      legend: [
        { label: 'Standard Terms Approved', color: '#9333ea', dashed: false },
        { label: 'Senior Underwriter Referral', color: '#ea580c', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '20', '40', '60', '80', '100'],
      yMax: 100,
      primaryValues: [38, 48, 56, 64, 70, 74, 77, 79, 81, 82],
      secondaryValues: [2, 2, 3, 3, 4, 4, 4, 4, 4, 4],
      statLeftLabel: 'Standard Approvals:',
      statLeftValue: '82 Policies',
      statRightLabel: 'Special Referrals:',
      statRightValue: '4 Cases'
    },
    'underwriter-stamped-quotes': {
      type: 'trend',
      tag: 'Carrier Formal Digitally Stamped Quotations',
      title: 'Insurer Digitally Stamped Quotes Received vs. Dispatched to Clients',
      legend: [
        { label: 'Carrier Stamped Quotes', color: '#ea580c', dashed: false },
        { label: 'Dispatched for Client Signoff', color: '#16a34a', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '50', '100', '150', '200', '250'],
      yMax: 250,
      primaryValues: [92, 115, 138, 155, 168, 178, 184, 188, 191, 194],
      secondaryValues: [90, 112, 136, 153, 166, 177, 184, 188, 191, 194],
      statLeftLabel: 'Digitally Stamped:',
      statLeftValue: '194 Quotes',
      statRightLabel: 'Dispatch Rate:',
      statRightValue: '100%'
    },
    'underwriter-facultative-referrals': {
      type: 'trend',
      tag: 'High-Hazard Risk & Treaty Exclusions',
      title: 'Facultative Reinsurance Placements vs. Syndicate Review',
      legend: [
        { label: 'Facultative Slips Bound', color: '#4f46e5', dashed: false },
        { label: 'Treaty Review / Syndicate Pending', color: '#dc2626', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '10', '20', '30', '40'],
      yMax: 40,
      primaryValues: [11, 14, 17, 20, 22, 24, 25, 26, 27, 28],
      secondaryValues: [3, 2, 4, 3, 5, 4, 3, 4, 4, 4],
      statLeftLabel: 'Facultative Placed:',
      statLeftValue: '28 Slips',
      statRightLabel: 'Treaty Review:',
      statRightValue: '4 In Review'
    },
    'underwriter-endorsements-mta': {
      type: 'trend',
      tag: 'Mid-Term Adjustments & Pro-Rata Re-pricing',
      title: 'Endorsement Processing Run-Rate vs. Pending Premium Settlement',
      legend: [
        { label: 'MTAs Successfully Endorsed', color: '#0d9488', dashed: false },
        { label: 'Pending Endorsement Premium', color: '#f59e0b', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '40', '80', '120', '160', '200'],
      yMax: 200,
      primaryValues: [72, 90, 108, 122, 134, 142, 147, 150, 152, 154],
      secondaryValues: [6, 5, 7, 5, 6, 5, 4, 5, 4, 4],
      statLeftLabel: 'MTAs Endorsed:',
      statLeftValue: '154 Issued',
      statRightLabel: 'Pending Underwriter:',
      statRightValue: '4 Cases'
    },
    'underwriter-binding-authorizations': {
      type: 'donut',
      tag: 'Authorized Binding Capacity by Line of Business',
      title: 'Binding Authority Distribution across Carrier Treaties',
      totalLabel: 'Bound Policies',
      totalNumber: '512 Bound',
      segments: [
        { label: 'Motor Fleet & Comprehensive (Sukoon, ADNIC, Tokio Marine)', pct: 42, color: '#2563eb' },
        { label: 'Group & SME Health (DubaiCare, Cigna, Allianz, GIG)', pct: 33, color: '#10b981' },
        { label: 'Property & Casualty / Engineering (Emirates Ins, Salama)', pct: 15, color: '#f59e0b' },
        { label: 'Life & High-Sum Keyman (Zurich, Bupa Global)', pct: 10, color: '#8b5cf6' }
      ]
    },
    'finance-debit-notes': {
      type: 'trend',
      tag: 'Policyholder Premium Invoicing & Collections',
      title: 'Invoiced Gross Premium vs. Settled Collections (AED)',
      legend: [
        { label: 'Invoiced Gross Premium (AED 000s)', color: '#2563eb', dashed: false },
        { label: 'Collected / Cleared Premium (AED 000s)', color: '#16a34a', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '300', '600', '900', '1200', '1500'],
      yMax: 1500,
      primaryValues: [920, 1050, 1180, 1260, 1310, 1370, 1410, 1440, 1465, 1480],
      secondaryValues: [840, 960, 1080, 1160, 1210, 1270, 1310, 1335, 1350, 1365],
      statLeftLabel: 'Total Invoiced:',
      statLeftValue: 'AED 14.8M',
      statRightLabel: 'Collection Ratio:',
      statRightValue: '92.2%'
    },
    'finance-credit-notes': {
      type: 'trend',
      tag: 'Cancellation Credit Notes & Return Premiums',
      title: 'Credit Notes Issued vs. Disbursed Premium Refunds (AED)',
      legend: [
        { label: 'Credit Notes Issued (AED 000s)', color: '#d97706', dashed: false },
        { label: 'Disbursed Client Refunds (AED 000s)', color: '#10b981', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '15', '30', '45', '60', '75'],
      yMax: 75,
      primaryValues: [24, 28, 35, 38, 42, 45, 48, 51, 54, 58],
      secondaryValues: [20, 25, 32, 34, 38, 40, 44, 47, 50, 52],
      statLeftLabel: 'Total Refunded:',
      statLeftValue: 'AED 480K',
      statRightLabel: 'Processing Rate:',
      statRightValue: '88.6%'
    },
    'finance-carrier-payables': {
      type: 'trend',
      tag: 'Carrier Net Remittances & Credit Terms',
      title: 'Net Premium Payables vs. Settled Remittances to 28 Insurers',
      legend: [
        { label: 'Carrier Net Payables (AED 000s)', color: '#059669', dashed: false },
        { label: 'Remitted Carrier Settlements (AED 000s)', color: '#0284c7', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '250', '500', '750', '1000', '1250'],
      yMax: 1250,
      primaryValues: [780, 890, 990, 1070, 1110, 1160, 1190, 1215, 1230, 1240],
      secondaryValues: [750, 860, 960, 1040, 1080, 1130, 1160, 1180, 1195, 1200],
      statLeftLabel: 'Net Remitted:',
      statLeftValue: 'AED 12.0M',
      statRightLabel: 'Settlement Terms:',
      statRightValue: '96.8%'
    },
    'finance-commission-soa': {
      type: 'trend',
      tag: 'Broker Commission Revenue & Statement Reconciliation',
      title: 'Gross Brokerage Commission Earned vs. Reconciled Carrier SOA Payouts',
      legend: [
        { label: 'Earned Commission (AED 000s)', color: '#d97706', dashed: false },
        { label: 'Reconciled SOA Payouts (AED 000s)', color: '#16a34a', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '50', '100', '150', '200', '250'],
      yMax: 250,
      primaryValues: [118, 138, 156, 172, 180, 192, 204, 215, 224, 234],
      secondaryValues: [110, 128, 146, 160, 168, 180, 192, 201, 210, 218],
      statLeftLabel: 'Total Commission:',
      statLeftValue: 'AED 1.95M',
      statRightLabel: 'Reconciled SOA:',
      statRightValue: '93.3%'
    },
    'finance-vat-tax': {
      type: 'donut',
      tag: 'UAE FTA 5% VAT Liability & Input/Output Tax',
      title: '5% UAE VAT Distribution by Line of Insurance Business',
      totalLabel: 'Total VAT Liability',
      totalNumber: 'AED 744K',
      segments: [
        { label: 'Corporate & Group Health (Sukoon, ADNIC, DubaiCare)', pct: 45, color: '#2563eb' },
        { label: 'Motor Fleet & Private Motor (GIG Gulf, Tokio Marine)', pct: 30, color: '#10b981' },
        { label: 'Commercial Property & Cargo (Emirates Ins, Orient)', pct: 15, color: '#f59e0b' },
        { label: 'Brokerage Services Output VAT', pct: 10, color: '#8b5cf6' }
      ]
    },
    'hr-employees': {
      type: 'trend',
      tag: 'Broker Personnel & CBUAE Licensing Compliance',
      title: 'Active Broker Staff vs. Certified License Holders',
      legend: [
        { label: 'Active Broker Staff', color: '#2563eb', dashed: false },
        { label: 'CBUAE Certified Licensees', color: '#16a34a', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '10', '20', '30', '40', '50'],
      yMax: 50,
      primaryValues: [38, 40, 41, 43, 44, 45, 46, 47, 47, 48],
      secondaryValues: [26, 28, 29, 30, 31, 32, 33, 33, 34, 34],
      statLeftLabel: 'Total Personnel:',
      statLeftValue: '48 Staff',
      statRightLabel: 'CBUAE Ratio:',
      statRightValue: '70.8%'
    },
    'hr-attendance-leaves': {
      type: 'trend',
      tag: 'Staff Attendance & Leave Utilization',
      title: 'Daily Attendance Rate (%) vs. Leave Quota Consumption',
      legend: [
        { label: 'Attendance Rate (%)', color: '#059669', dashed: false },
        { label: 'Leave Utilization (%)', color: '#ea580c', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['80', '85', '90', '95', '100'],
      yMax: 100,
      primaryValues: [95.2, 96.0, 96.8, 97.1, 97.4, 96.9, 97.2, 97.5, 97.6, 97.8],
      secondaryValues: [4.8, 4.0, 3.2, 2.9, 2.6, 3.1, 2.8, 2.5, 2.4, 2.2],
      statLeftLabel: 'Present Today:',
      statLeftValue: '97.8%',
      statRightLabel: 'Active Leaves:',
      statRightValue: '3 Approved'
    },
    'hr-payroll-wps': {
      type: 'trend',
      tag: 'UAE MoHRE Wage Protection System (WPS) & Commission',
      title: 'Monthly Base Payroll vs. Performance Incentive Commissions (AED)',
      legend: [
        { label: 'Fixed Base WPS Payroll (AED 000s)', color: '#0284c7', dashed: false },
        { label: 'Broker Commissions Disbursed (AED 000s)', color: '#d97706', dashed: true }
      ],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      yTicks: ['0', '125', '250', '375', '500', '625'],
      yMax: 625,
      primaryValues: [340, 345, 350, 360, 365, 370, 372, 375, 376, 378],
      secondaryValues: [95, 105, 115, 122, 128, 134, 138, 140, 141, 142],
      statLeftLabel: 'Monthly Payroll:',
      statLeftValue: 'AED 520K',
      statRightLabel: 'WPS SIF:',
      statRightValue: '100% Verified'
    },
    'hr-benefits-medical': {
      type: 'donut',
      tag: 'Group Health Insurance & Staff Benefits',
      title: 'Company Medical Insurance Coverage by Carrier Network Tier',
      totalLabel: 'Enrolled Members',
      totalNumber: '124 Lives',
      segments: [
        { label: 'Sukoon Comprehensive Gold (Corporate Scheme)', pct: 40, color: '#2563eb' },
        { label: 'ADNIC Platinum Plus (Executive & Senior Brokers)', pct: 30, color: '#10b981' },
        { label: 'Allianz Care Worldwide (Regional Officers)', pct: 20, color: '#f59e0b' },
        { label: 'DubaiCare Enhanced (General Retail Staff)', pct: 10, color: '#8b5cf6' }
      ]
    }
  };

  // Metric Categories for Strict Role-Based Access Control
  const ADMIN_CHART_METRICS = [
    { value: 'debit-notes', label: '1. Debit Notes & GWP Trend' },
    { value: 'credit-notes', label: '2. Credit Notes & Adjustments' },
    { value: 'customers', label: '3. Customer Acquisition & Retention' },
    { value: 'policies', label: '4. Carrier Policy Distribution' },
    { value: 'pending-policies', label: '5. Underwriting Pipeline' },
    { value: 'renewal-policies', label: '6. Proactive Renewal Timeline' },
    { value: 'leads', label: '7. Lead-to-Policy Conversion Funnel' },
    { value: 'roles', label: '8. RBAC Role & User Distribution' },
    { value: 'payables', label: '9. Carrier Settlement Payables' },
    { value: 'receivables', label: '10. Policyholder Premium Receivables' },
    { value: 'commissions', label: '11. Broker Commission Yield' }
  ];

  const LEAD_CHART_METRICS = [
    { value: 'lead-extractor', label: '1. Lead Extractor Multi-Channel Run-Rate' },
    { value: 'incoming-leads', label: '2. Inbound Volume: Assigned vs. Unassigned' },
    { value: 'quote-inquiries', label: '3. Partner Instant Quote Requests' },
    { value: 'renewal-leads', label: '4. Expiring Policy Renewal Pipeline' },
    { value: 'corporate-leads', label: '5. Corporate & Group Scheme Inquiries' },
    { value: 'broker-intake', label: '6. Broker & Affiliate Intermediary Intake' },
    { value: 'duplicate-checks', label: '7. Cross-Carrier Deduplication & Scrubbing' },
    { value: 'carrier-feeds', label: '8. Realtime Carrier Webhook Feeds' }
  ];

  const SALES_CHART_METRICS = [
    { value: 'sales-assigned-leads', label: '1. Assigned Leads Pipeline & Velocity' },
    { value: 'sales-quote-requests', label: '2. Multi-Carrier Quotation Dispatch' },
    { value: 'sales-comparison-sheets', label: '3. Comparative Price Matrix Views' },
    { value: 'sales-renewals', label: '4. Proactive Renewal Retention Run-Rate' },
    { value: 'sales-ocr-docs', label: '5. KYC / Mulkiya OCR Verification Rate' },
    { value: 'sales-payment-links', label: '6. Payment Link Conversion & Settlement' },
    { value: 'sales-issued-policies', label: '7. Policy Issuance & Premium Volume' },
    { value: 'sales-commissions', label: '8. Agent Commission Yield & Payout' }
  ];

  const COMPLIANCE_CHART_METRICS = [
    { value: 'compliance-sanctions', label: '1. Sanctions & PEP Screening Ledger' },
    { value: 'compliance-kyc-verification', label: '2. Emirates ID & UAE Pass Verification' },
    { value: 'compliance-beneficiary-audit', label: '3. Beneficiary & Member Exclusions' },
    { value: 'compliance-audit-logs', label: '4. Broker Privilege Audit Trail' }
  ];

  const UNDERWRITER_CHART_METRICS = [
    { value: 'underwriter-quotes-queue', label: '1. Quotation & Rating Queue Flow' },
    { value: 'underwriter-medical-rating', label: '2. Medical & Group Health Rating' },
    { value: 'underwriter-motor-rating', label: '3. Motor & Fleet Risk Profiling' },
    { value: 'underwriter-binding-authorizations', label: '4. Binding Authorizations Distribution' }
  ];

  const FINANCE_CHART_METRICS = [
    { value: 'finance-debit-notes', label: '1. Debit Notes & Premium Receivables' },
    { value: 'finance-credit-notes', label: '2. Credit Notes & Premium Adjustments' },
    { value: 'finance-carrier-payables', label: '3. Carrier Settlements & Payables' },
    { value: 'finance-commission-soa', label: '4. Brokerage Commission & SOA Reconciliation' },
    { value: 'finance-vat-tax', label: '5. UAE VAT & Tax Compliance' }
  ];

  const HR_CHART_METRICS = [
    { value: 'hr-employees', label: '1. Employee Directory & Licensing' },
    { value: 'hr-attendance-leaves', label: '2. Attendance & Leave Management' },
    { value: 'hr-payroll-wps', label: '3. WPS Payroll & Compensation' },
    { value: 'hr-benefits-medical', label: '4. Group Medical & Staff Benefits' }
  ];

  // Dynamically populate chart options based on active user role
  function populateChartDropdown(roleKey, selectedMetric) {
    if (!chartMetricSelect) return;
    chartMetricSelect.innerHTML = '';

    if (roleKey === 'admin') {
      // Admin sees Core Insurance Registers, Lead Management Feeds, Sales Agent, Compliance, Underwriting, AND Finance charts
      const adminGroup = document.createElement('optgroup');
      adminGroup.label = 'Core Insurance Registers (Admin Only)';
      ADMIN_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        adminGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(adminGroup);

      const leadGroup = document.createElement('optgroup');
      leadGroup.label = 'Lead Management & Ingestion Feeds';
      LEAD_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        leadGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(leadGroup);

      const salesGroup = document.createElement('optgroup');
      salesGroup.label = 'Sales Agent Pipeline & Conversion';
      SALES_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        salesGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(salesGroup);

      const compGroup = document.createElement('optgroup');
      compGroup.label = 'Compliance & Regulatory Oversight';
      COMPLIANCE_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        compGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(compGroup);

      const underwriterGroup = document.createElement('optgroup');
      underwriterGroup.label = 'Underwriting, Rating & Binding Analytics';
      UNDERWRITER_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        underwriterGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(underwriterGroup);

      const financeGroup = document.createElement('optgroup');
      financeGroup.label = 'Finance, Carrier Settlements & VAT Accounting';
      FINANCE_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        financeGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(financeGroup);

      const hrGroup = document.createElement('optgroup');
      hrGroup.label = 'Human Resources & Corporate Healthcare';
      HR_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        hrGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(hrGroup);

    } else if (roleKey === 'role-lead-management') {
      // STRICT: Lead Management can ONLY see Lead Management charts!
      const leadGroup = document.createElement('optgroup');
      leadGroup.label = 'Lead Management Feeds & Analytics';
      LEAD_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        leadGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(leadGroup);

    } else if (roleKey === 'role-sales-agent') {
      // STRICT: Sales Agent can ONLY see Sales Agent charts!
      const salesGroup = document.createElement('optgroup');
      salesGroup.label = 'Sales Agent Pipeline & Conversion';
      SALES_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        salesGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(salesGroup);

    } else if (roleKey === 'role-compliance') {
      // STRICT: Compliance Officer can ONLY see Compliance charts!
      const compGroup = document.createElement('optgroup');
      compGroup.label = 'Compliance & Regulatory Oversight';
      COMPLIANCE_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        compGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(compGroup);

    } else if (roleKey === 'role-underwriter') {
      // STRICT: Underwriter can ONLY see Underwriting charts!
      const underwriterGroup = document.createElement('optgroup');
      underwriterGroup.label = 'Underwriting, Rating & Binding Analytics';
      UNDERWRITER_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        underwriterGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(underwriterGroup);

    } else if (roleKey === 'role-finance') {
      // STRICT: Finance Officer can ONLY see Finance charts!
      const financeGroup = document.createElement('optgroup');
      financeGroup.label = 'Finance, Carrier Settlements & VAT Accounting';
      FINANCE_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        financeGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(financeGroup);

    } else if (roleKey === 'role-hr') {
      // STRICT: HR Officer can ONLY see HR charts!
      const hrGroup = document.createElement('optgroup');
      hrGroup.label = 'Human Resources & Corporate Healthcare';
      HR_CHART_METRICS.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        if (item.value === selectedMetric) opt.selected = true;
        hrGroup.appendChild(opt);
      });
      chartMetricSelect.appendChild(hrGroup);
    }
  }

  // Open Chart Modal with strict Role-Based Access Control
  function openChartModal(metricKey) {
    if (!chartModal) return;
    const currentRoleKey = sessionStorage.getItem('unitrust_auth_role') || 'admin';

    const isLeadChart = LEAD_CHART_METRICS.some(c => c.value === metricKey);
    const isSalesChart = SALES_CHART_METRICS.some(c => c.value === metricKey);
    const isComplianceChart = COMPLIANCE_CHART_METRICS.some(c => c.value === metricKey);
    const isUnderwriterChart = UNDERWRITER_CHART_METRICS.some(c => c.value === metricKey);
    const isFinanceChart = FINANCE_CHART_METRICS.some(c => c.value === metricKey);
    const isHRChart = HR_CHART_METRICS.some(c => c.value === metricKey);
    const isAdminChart = ADMIN_CHART_METRICS.some(c => c.value === metricKey);

    // Rule: Role chart permissions
    if (currentRoleKey !== 'admin' && currentRoleKey !== 'role-lead-management' && currentRoleKey !== 'role-sales-agent' && currentRoleKey !== 'role-compliance' && currentRoleKey !== 'role-underwriter' && currentRoleKey !== 'role-finance' && currentRoleKey !== 'role-hr') {
      return;
    }

    let targetKey = metricKey;

    if (currentRoleKey === 'role-lead-management') {
      // Lead Management user can NEVER view other role charts!
      if (!isLeadChart) {
        targetKey = 'incoming-leads';
      }
    } else if (currentRoleKey === 'role-sales-agent') {
      // Sales Agent user can NEVER view other role charts!
      if (!isSalesChart) {
        targetKey = 'sales-assigned-leads';
      }
    } else if (currentRoleKey === 'role-compliance') {
      // Compliance Officer can NEVER view other role charts!
      if (!isComplianceChart) {
        targetKey = 'compliance-sanctions';
      }
    } else if (currentRoleKey === 'role-underwriter') {
      // Underwriter can NEVER view other role charts!
      if (!isUnderwriterChart) {
        targetKey = 'underwriter-quotes-queue';
      }
    } else if (currentRoleKey === 'role-finance') {
      // Finance Officer can NEVER view other role charts!
      if (!isFinanceChart) {
        targetKey = 'finance-debit-notes';
      }
    } else if (currentRoleKey === 'role-hr') {
      // HR Officer can NEVER view other role charts!
      if (!isHRChart) {
        targetKey = 'hr-employees';
      }
    } else if (currentRoleKey === 'admin') {
      if (!chartConfigs[targetKey]) {
        targetKey = 'debit-notes';
      }
    }

    populateChartDropdown(currentRoleKey, targetKey);
    if (chartMetricSelect) chartMetricSelect.value = targetKey;
    renderAnalyticsChart(targetKey);
    chartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  // Close Chart Modal
  function closeChart() {
    if (!chartModal) return;
    chartModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (closeChartModal) closeChartModal.addEventListener('click', closeChart);
  if (chartModalBackdrop) chartModalBackdrop.addEventListener('click', closeChart);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chartModal && !chartModal.classList.contains('hidden')) {
      closeChart();
    }
  });

  // Switch Metric via Dropdown
  if (chartMetricSelect) {
    chartMetricSelect.addEventListener('change', (e) => {
      const currentRoleKey = sessionStorage.getItem('unitrust_auth_role') || 'admin';
      let selectedVal = e.target.value;

      if (currentRoleKey === 'role-lead-management') {
        const isLeadChart = LEAD_CHART_METRICS.some(c => c.value === selectedVal);
        if (!isLeadChart) {
          selectedVal = 'incoming-leads';
          chartMetricSelect.value = selectedVal;
        }
      } else if (currentRoleKey === 'role-sales-agent') {
        const isSalesChart = SALES_CHART_METRICS.some(c => c.value === selectedVal);
        if (!isSalesChart) {
          selectedVal = 'sales-assigned-leads';
          chartMetricSelect.value = selectedVal;
        }
      } else if (currentRoleKey === 'role-compliance') {
        const isCompChart = COMPLIANCE_CHART_METRICS.some(c => c.value === selectedVal);
        if (!isCompChart) {
          selectedVal = 'compliance-sanctions';
          chartMetricSelect.value = selectedVal;
        }
      } else if (currentRoleKey === 'role-underwriter') {
        const isUwChart = UNDERWRITER_CHART_METRICS.some(c => c.value === selectedVal);
        if (!isUwChart) {
          selectedVal = 'underwriter-quotes-queue';
          chartMetricSelect.value = selectedVal;
        }
      } else if (currentRoleKey === 'role-finance') {
        const isFinChart = FINANCE_CHART_METRICS.some(c => c.value === selectedVal);
        if (!isFinChart) {
          selectedVal = 'finance-debit-notes';
          chartMetricSelect.value = selectedVal;
        }
      } else if (currentRoleKey === 'role-hr') {
        const isHR = HR_CHART_METRICS.some(c => c.value === selectedVal);
        if (!isHR) {
          selectedVal = 'hr-employees';
          chartMetricSelect.value = selectedVal;
        }
      }
      renderAnalyticsChart(selectedVal);
    });
  }

  // Attach Click Handlers to all Card Chart Buttons
  function bindChartButtons() {
    const chartButtons = document.querySelectorAll('.card-chart-btn');
    chartButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const metric = btn.getAttribute('data-chart');
        if (metric) openChartModal(metric);
      });
    });
  }
  bindChartButtons();

  // Render SVG Chart Matching Uploaded Specs
  function renderAnalyticsChart(metricKey) {
    const config = chartConfigs[metricKey] || chartConfigs['debit-notes'];
    if (!chartModalBody) return;

    if (modalChartTag) modalChartTag.textContent = config.tag;
    if (modalChartTitle) modalChartTitle.textContent = config.title;

    if (config.type === 'trend') {
      chartModalBody.innerHTML = renderTrendChartHtml(config);
    } else if (config.type === 'funnel') {
      chartModalBody.innerHTML = renderFunnelChartHtml(config);
    } else if (config.type === 'donut') {
      chartModalBody.innerHTML = renderDonutChartHtml(config);
    }
  }

  // 1. Trend Line & Area Chart (Photo 1 Replica)
  function renderTrendChartHtml(c) {
    const w = 720;
    const h = 260;
    const paddingLeft = 55;
    const paddingRight = 25;
    const paddingTop = 20;
    const paddingBottom = 40;
    const plotW = w - paddingLeft - paddingRight;
    const plotH = h - paddingTop - paddingBottom;

    // Grid lines and Y axis
    let gridHtml = '';
    const numYTicks = c.yTicks.length;
    c.yTicks.forEach((tick, idx) => {
      const y = paddingTop + plotH - (idx / (numYTicks - 1)) * plotH;
      gridHtml += `
        <line x1="${paddingLeft}" y1="${y}" x2="${w - paddingRight}" y2="${y}" stroke="#eef2f6" stroke-width="1" />
        <text x="${paddingLeft - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#94a3b8" font-family="Plus Jakarta Sans, sans-serif">${tick}</text>
      `;
    });

    // Month X Ticks
    const numX = c.months.length;
    const pointsP = [];
    const pointsS = [];
    let xLabelsHtml = '';

    c.months.forEach((m, idx) => {
      const x = paddingLeft + (idx / (numX - 1)) * plotW;
      xLabelsHtml += `
        <text x="${x}" y="${h - 12}" text-anchor="middle" font-size="11.5" font-weight="500" fill="#64748b" font-family="Plus Jakarta Sans, sans-serif">${m}</text>
      `;

      // Primary Line Coordinates
      const valP = c.primaryValues[idx];
      const yP = paddingTop + plotH - (valP / c.yMax) * plotH;
      pointsP.push({ x, y: yP, val: valP });

      // Secondary Line Coordinates
      const valS = c.secondaryValues[idx];
      const yS = paddingTop + plotH - (valS / c.yMax) * plotH;
      pointsS.push({ x, y: yS, val: valS });
    });

    // SVG Polyline & Area path
    const polylineP = pointsP.map(pt => `${pt.x},${pt.y}`).join(' ');
    const areaPath = `M ${pointsP[0].x},${paddingTop + plotH} L ` + pointsP.map(pt => `${pt.x},${pt.y}`).join(' L ') + ` L ${pointsP[pointsP.length - 1].x},${paddingTop + plotH} Z`;
    const polylineS = pointsS.map(pt => `${pt.x},${pt.y}`).join(' ');

    // Circles
    const circlesP = pointsP.map(pt => `
      <circle cx="${pt.x}" cy="${pt.y}" r="4.5" fill="#ffffff" stroke="${c.legend[0].color}" stroke-width="2.5" />
    `).join('');

    const circlesS = pointsS.map(pt => `
      <circle cx="${pt.x}" cy="${pt.y}" r="3.5" fill="${c.legend[1].color}" />
    `).join('');

    return `
      <div class="chart-canvas-container">
        <!-- Legend Header (Photo 1 Replica) -->
        <div class="chart-header-legend">
          <div class="legend-item">
            <span class="legend-dot" style="background-color: ${c.legend[0].color};"></span>
            <span>${c.legend[0].label}</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot dashed" style="background-color: ${c.legend[1].color};"></span>
            <span>${c.legend[1].label}</span>
          </div>
        </div>

        <!-- SVG Vector Canvas -->
        <div class="chart-svg-wrap">
          <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${c.legend[0].color}" stop-opacity="0.22" />
                <stop offset="100%" stop-color="${c.legend[0].color}" stop-opacity="0.01" />
              </linearGradient>
            </defs>

            <!-- Y Grid & Labels -->
            ${gridHtml}

            <!-- Area Shading -->
            <path d="${areaPath}" fill="url(#trendGradient)" />

            <!-- Primary Line -->
            <polyline fill="none" stroke="${c.legend[0].color}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" points="${polylineP}" />
            ${circlesP}

            <!-- Secondary Dashed Line -->
            <polyline fill="none" stroke="${c.legend[1].color}" stroke-width="2.2" stroke-dasharray="5 5" stroke-linecap="round" stroke-linejoin="round" points="${polylineS}" />
            ${circlesS}

            <!-- X Axis Month Labels -->
            ${xLabelsHtml}
          </svg>
        </div>

        <!-- Bottom Stats Row (Photo 1 Replica) -->
        <div class="chart-stats-row">
          <div class="chart-stat-item">
            <span class="chart-stat-label">${c.statLeftLabel}</span>
            <span class="chart-stat-value highlight-blue">${c.statLeftValue}</span>
          </div>
          <div class="chart-stat-item">
            <span class="chart-stat-label">${c.statRightLabel}</span>
            <span class="chart-stat-value">${c.statRightValue}</span>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Horizontal Funnel Bar Chart (Photo 2 Replica)
  function renderFunnelChartHtml(c) {
    const w = 720;
    const h = 270;
    const labelWidth = 190;
    const paddingRight = 40;
    const paddingTop = 25;
    const plotW = w - labelWidth - paddingRight;

    const rowHeight = 44;
    const barHeight = 22;

    // Gridlines for X ticks
    let gridHtml = '';
    let xTicksHtml = '';
    c.xTicks.forEach(tick => {
      const x = labelWidth + (tick / c.xMax) * plotW;
      gridHtml += `
        <line x1="${x}" y1="${paddingTop}" x2="${x}" y2="${paddingTop + c.stages.length * rowHeight}" stroke="#eef2f6" stroke-width="1" />
      `;
      xTicksHtml += `
        <text x="${x}" y="${paddingTop + c.stages.length * rowHeight + 20}" text-anchor="middle" font-size="11" fill="#94a3b8" font-family="Plus Jakarta Sans, sans-serif">${tick}</text>
      `;
    });

    // Bars and Stage Labels
    let barsHtml = '';
    c.stages.forEach((stage, idx) => {
      const y = paddingTop + idx * rowHeight;
      const barW = Math.max(8, (stage.value / c.xMax) * plotW);

      barsHtml += `
        <!-- Stage Y Label -->
        <text x="${labelWidth - 14}" y="${y + barHeight - 6}" text-anchor="end" font-size="12" font-weight="600" fill="#334155" font-family="Plus Jakarta Sans, sans-serif">${stage.label}</text>
        
        <!-- Background track -->
        <rect x="${labelWidth}" y="${y}" width="${plotW}" height="${barHeight}" rx="6" fill="#f8fafc" />
        
        <!-- Active Bar with rounded right caps -->
        <rect x="${labelWidth}" y="${y}" width="${barW}" height="${barHeight}" rx="6" fill="${stage.color}">
          <title>${stage.label}: ${stage.value.toLocaleString()}</title>
        </rect>
        
        <!-- Value Label Inside or Beside Bar -->
        <text x="${labelWidth + barW + 8}" y="${y + barHeight - 6}" font-size="11.5" font-weight="700" fill="#475569" font-family="Plus Jakarta Sans, sans-serif">${stage.value.toLocaleString()}</text>
      `;
    });

    return `
      <div class="chart-canvas-container">
        <!-- SVG Funnel Vector Canvas -->
        <div class="chart-svg-wrap">
          <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">
            <!-- Vertical Gridlines -->
            ${gridHtml}

            <!-- Horizontal Bars -->
            ${barsHtml}

            <!-- X Axis Ticks -->
            ${xTicksHtml}
          </svg>
        </div>

        <!-- Bottom Stats Row (Photo 2 Replica) -->
        <div class="chart-stats-row">
          <div class="chart-stat-item">
            <span class="chart-stat-label">${c.statLeftLabel}</span>
            <span class="chart-stat-value">${c.statLeftValue}</span>
          </div>
          <div class="chart-stat-item">
            <span class="chart-stat-label">${c.statRightLabel}</span>
            <span class="chart-stat-value highlight-green">${c.statRightValue}</span>
          </div>
        </div>
      </div>
    `;
  }

  // 3. Donut Ring Chart with Center Text & Right Legend (Photo 3 Replica)
  function renderDonutChartHtml(c) {
    const w = 720;
    const h = 260;
    const cx = 220;
    const cy = 130;
    const r = 85;
    const strokeWidth = 34;
    const circumference = 2 * Math.PI * r;

    let accumulatedPct = 0;
    let slicesHtml = '';

    c.segments.forEach((seg) => {
      const slicePct = seg.value / 100;
      const strokeDash = slicePct * circumference;
      const strokeOffset = -accumulatedPct * circumference;
      accumulatedPct += slicePct;

      slicesHtml += `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
          stroke="${seg.color}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${strokeDash - 2} ${circumference - strokeDash + 2}"
          stroke-dashoffset="${strokeOffset}"
          transform="rotate(-90 ${cx} ${cy})">
          <title>${seg.label}: ${seg.value}%</title>
        </circle>
      `;
    });

    // Right-Side Legend List (Photo 3 Replica)
    let legendHtml = '';
    c.segments.forEach(seg => {
      legendHtml += `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 4px 0;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="width: 11px; height: 11px; border-radius: 50%; background-color: ${seg.color}; display: inline-block;"></span>
            <span style="font-size: 13px; font-weight: 600; color: #334155;">${seg.label}</span>
          </div>
          <span style="font-size: 12.5px; font-weight: 700; color: #64748b;">${seg.value}%</span>
        </div>
      `;
    });

    return `
      <div class="chart-canvas-container">
        <div style="display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
          <!-- Left Donut Vector -->
          <div style="flex: 1; min-width: 280px; max-width: 380px;">
            <svg viewBox="0 0 440 260" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: auto; display: block;">
              <!-- Slices -->
              ${slicesHtml}

              <!-- Donut Center Text (Photo 3 Replica) -->
              <text x="${cx}" y="${cy - 12}" text-anchor="middle" font-size="11.5" font-weight="600" fill="#94a3b8" font-family="Plus Jakarta Sans, sans-serif">${c.centerTop}</text>
              <text x="${cx}" y="${cy + 11}" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a" font-family="Plus Jakarta Sans, sans-serif">${c.centerMain}</text>
              <text x="${cx}" y="${cy + 30}" text-anchor="middle" font-size="12" font-weight="700" fill="${c.segments[0].color}" font-family="Plus Jakarta Sans, sans-serif">${c.centerSub}</text>
            </svg>
          </div>

          <!-- Right Legend -->
          <div style="flex: 1; min-width: 260px; max-width: 320px; padding: 10px 0;">
            <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">
              Market Placement Share
            </div>
            ${legendHtml}
          </div>
        </div>

        <!-- Bottom Stats Row (Photo 3 Replica) -->
        <div class="chart-stats-row">
          <div class="chart-stat-item">
            <span class="chart-stat-label">Dominant Carrier:</span>
            <span class="chart-stat-value highlight-blue">${c.dominantLabel}</span>
          </div>
          <div class="chart-stat-item">
            <span class="chart-stat-label">${c.substatLabel.split(':')[0]}:</span>
            <span class="chart-stat-value">${c.substatLabel.split(':')[1]}</span>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================================
  // OPERATIONS DATA CENTER: TAB SWITCHING & REAL-TIME SEARCH
  // ========================================================
  const consolePills = document.querySelectorAll('.operations-console-section .workflow-pill');
  const consolePanels = document.querySelectorAll('.operations-console-section .console-tab-panel');
  const consoleSearchInputs = document.querySelectorAll('.workflow-search-input');

  function activateConsoleTab(targetTabId) {
    if (!targetTabId) return;

    // Update active state on all matching pills across the page
    consolePills.forEach(pill => {
      const match = pill.getAttribute('data-tab-target') === targetTabId;
      pill.classList.toggle('active', match);
    });

    // Update active state on tab panels
    consolePanels.forEach(panel => {
      const match = panel.id === targetTabId;
      panel.classList.toggle('active', match);
    });

    // Re-apply search filter if query is present
    consoleSearchInputs.forEach(input => {
      if (input && input.value.trim()) {
        filterConsoleTable(input.value.trim());
      }
    });
  }

  consolePills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const target = pill.getAttribute('data-tab-target');
      activateConsoleTab(target);
    });
  });

  function filterConsoleTable(query) {
    const activePanels = document.querySelectorAll('.operations-console-section .console-tab-panel.active');
    const lowerQuery = query.toLowerCase();

    activePanels.forEach(panel => {
      const rows = panel.querySelectorAll('.data-table tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(lowerQuery) ? '' : 'none';
      });
    });
  }

  consoleSearchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      filterConsoleTable(e.target.value.trim());
    });
  });

  // ========================================================
  // LEAD MANAGEMENT TABLE: SEARCH & CHANNEL FILTERING
  // ========================================================
  const leadSearchInput = document.getElementById('leadSearchInput');
  const leadTable = document.getElementById('leadManagementTable');
  const leadFilterPills = document.querySelectorAll('#view-role-lead-management .sub-stat-pill[style*="cursor: pointer"]');

  if (leadSearchInput && leadTable) {
    leadSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const rows = leadTable.querySelectorAll('tbody tr');
      rows.forEach(tr => {
        const text = tr.textContent.toLowerCase();
        tr.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  if (leadFilterPills.length && leadTable) {
    leadFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const label = pill.textContent.toLowerCase();
        const rows = leadTable.querySelectorAll('tbody tr');
        
        leadFilterPills.forEach(p => {
          p.style.opacity = '0.7';
          p.style.boxShadow = '';
        });
        pill.style.opacity = '1';
        pill.style.boxShadow = '0 0 0 2px var(--navy-primary)';

        rows.forEach(tr => {
          const text = tr.textContent.toLowerCase();
          if (label.includes('all leads')) {
            tr.style.display = '';
          } else if (label.includes('unassigned')) {
            tr.style.display = text.includes('unassigned') ? '' : 'none';
          } else if (label.includes('extractor')) {
            tr.style.display = text.includes('lead extractor') ? '' : 'none';
          } else if (label.includes('quote')) {
            tr.style.display = (text.includes('quote') || text.includes('web quoter')) ? '' : 'none';
          } else if (label.includes('renewal')) {
            tr.style.display = text.includes('renewal') ? '' : 'none';
          } else if (label.includes('corporate') || label.includes('group')) {
            tr.style.display = (text.includes('corporate') || text.includes('group') || text.includes('fleet')) ? '' : 'none';
          }
        });
      });
    });
  }
});

