document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    const appHeader = document.querySelector('.app-header');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetViewId = item.getAttribute('data-view');
            
            // Update active state on nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Switch view
            views.forEach(view => {
                view.classList.remove('active-view');
                if(view.id === `view-${targetViewId}`) {
                    view.classList.add('active-view');
                }
            });
            // Adjust header visibility for map view (since it has a floating search bar)
            if(targetViewId === 'map') {
                appHeader.style.display = 'none';
            } else {
                appHeader.style.display = 'flex';
            }
        });
    });
    // --- Marketplace Tabs Logic ---
    const marketplaceTabs = document.querySelectorAll('.marketplace-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');
    marketplaceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            
            marketplaceTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if(content.id === `tab-${targetId}`) {
                    content.classList.add('active');
                }
            });
        });
    });
    // --- Scanner Simulation Logic ---
    const btnSimulateScan = document.getElementById('btn-simulate-scan');
    const scanResult = document.getElementById('scan-result');
    const headerPoints = document.getElementById('header-points');
    const dashboardPoints = document.getElementById('dashboard-points');
    let currentPoints = 2450;
    btnSimulateScan.addEventListener('click', () => {
        // Hide button, show result with animation
        btnSimulateScan.style.display = 'none';
        scanResult.classList.remove('hidden');
        
        // Trigger reflow for animation
        void scanResult.offsetWidth; 
        scanResult.classList.add('show');
        // Update points
        currentPoints += 45;
        
        // Format number with commas
        const formattedPoints = currentPoints.toLocaleString();
        
        // Animate points change
        headerPoints.textContent = formattedPoints;
        dashboardPoints.textContent = formattedPoints;
        
        // Flash effect on points
        headerPoints.style.color = 'var(--color-primary)';
        setTimeout(() => {
            headerPoints.style.color = '';
        }, 500);
        // Reset after 3 seconds
        setTimeout(() => {
            scanResult.classList.remove('show');
            setTimeout(() => {
                scanResult.classList.add('hidden');
                btnSimulateScan.style.display = 'flex';
            }, 400); // Wait for transition out
        }, 3000);
    });
    // --- Add subtle entrance animations to list items ---
    const txItems = document.querySelectorAll('.transaction-item');
    txItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animationFillMode = 'both';
        item.style.animationName = 'fadeIn';
        item.style.animationDuration = '0.5s';
    });
});
