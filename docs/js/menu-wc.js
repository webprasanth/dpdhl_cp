'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">common-platform documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApplicationModule.html" data-type="entity-link">ApplicationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ApplicationModule-d814871a3ad58713126aa54fa9a7382c"' : 'data-target="#xs-components-links-module-ApplicationModule-d814871a3ad58713126aa54fa9a7382c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ApplicationModule-d814871a3ad58713126aa54fa9a7382c"' :
                                            'id="xs-components-links-module-ApplicationModule-d814871a3ad58713126aa54fa9a7382c"' }>
                                            <li class="link">
                                                <a href="components/AllAppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AllAppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BulkUploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BulkUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavoriteApplicationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FavoriteApplicationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApplicationModule-d814871a3ad58713126aa54fa9a7382c"' : 'data-target="#xs-injectables-links-module-ApplicationModule-d814871a3ad58713126aa54fa9a7382c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApplicationModule-d814871a3ad58713126aa54fa9a7382c"' :
                                        'id="xs-injectables-links-module-ApplicationModule-d814871a3ad58713126aa54fa9a7382c"' }>
                                        <li class="link">
                                            <a href="injectables/ApplicationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApplicationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ApplicationRoutingModule.html" data-type="entity-link">ApplicationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ab65587a736cde48cb22f2486b80ac93"' : 'data-target="#xs-components-links-module-AppModule-ab65587a736cde48cb22f2486b80ac93"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ab65587a736cde48cb22f2486b80ac93"' :
                                            'id="xs-components-links-module-AppModule-ab65587a736cde48cb22f2486b80ac93"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-ab65587a736cde48cb22f2486b80ac93"' : 'data-target="#xs-injectables-links-module-AppModule-ab65587a736cde48cb22f2486b80ac93"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ab65587a736cde48cb22f2486b80ac93"' :
                                        'id="xs-injectables-links-module-AppModule-ab65587a736cde48cb22f2486b80ac93"' }>
                                        <li class="link">
                                            <a href="injectables/AppInsightService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppInsightService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AssociationsModule.html" data-type="entity-link">AssociationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AssociationsModule-8f2856687beb7498319ea299ae2bb021"' : 'data-target="#xs-components-links-module-AssociationsModule-8f2856687beb7498319ea299ae2bb021"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AssociationsModule-8f2856687beb7498319ea299ae2bb021"' :
                                            'id="xs-components-links-module-AssociationsModule-8f2856687beb7498319ea299ae2bb021"' }>
                                            <li class="link">
                                                <a href="components/AssociationsViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AssociationsViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AssociationsRoutingModule.html" data-type="entity-link">AssociationsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BusinessUnitModule.html" data-type="entity-link">BusinessUnitModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BusinessUnitModule-d8b1beb52848c57a0154af67ed9e3e44"' : 'data-target="#xs-components-links-module-BusinessUnitModule-d8b1beb52848c57a0154af67ed9e3e44"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BusinessUnitModule-d8b1beb52848c57a0154af67ed9e3e44"' :
                                            'id="xs-components-links-module-BusinessUnitModule-d8b1beb52848c57a0154af67ed9e3e44"' }>
                                            <li class="link">
                                                <a href="components/AddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BusinessUnitModule-d8b1beb52848c57a0154af67ed9e3e44"' : 'data-target="#xs-injectables-links-module-BusinessUnitModule-d8b1beb52848c57a0154af67ed9e3e44"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BusinessUnitModule-d8b1beb52848c57a0154af67ed9e3e44"' :
                                        'id="xs-injectables-links-module-BusinessUnitModule-d8b1beb52848c57a0154af67ed9e3e44"' }>
                                        <li class="link">
                                            <a href="injectables/BusinessUnitService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BusinessUnitService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BusinessUnitRoutingModule.html" data-type="entity-link">BusinessUnitRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-24bd81abc26d3b2f59d049ab3e6d9ace"' : 'data-target="#xs-components-links-module-DashboardModule-24bd81abc26d3b2f59d049ab3e6d9ace"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-24bd81abc26d3b2f59d049ab3e6d9ace"' :
                                            'id="xs-components-links-module-DashboardModule-24bd81abc26d3b2f59d049ab3e6d9ace"' }>
                                            <li class="link">
                                                <a href="components/AppOwnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppOwnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewApplicationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewApplicationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuickViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuickViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserGraphComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserGraphComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link">DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DevicesModule.html" data-type="entity-link">DevicesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DevicesModule-ac69a18eb3b0129e0ed60d6365b34951"' : 'data-target="#xs-injectables-links-module-DevicesModule-ac69a18eb3b0129e0ed60d6365b34951"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DevicesModule-ac69a18eb3b0129e0ed60d6365b34951"' :
                                        'id="xs-injectables-links-module-DevicesModule-ac69a18eb3b0129e0ed60d6365b34951"' }>
                                        <li class="link">
                                            <a href="injectables/DeviceIdResolverService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DeviceIdResolverService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeviceResolverService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DeviceResolverService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeviceService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DeviceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DevicesRoutingModule.html" data-type="entity-link">DevicesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FeatureModule.html" data-type="entity-link">FeatureModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-b6259eb8d857dd387fce667c1a399038"' : 'data-target="#xs-components-links-module-HomeModule-b6259eb8d857dd387fce667c1a399038"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-b6259eb8d857dd387fce667c1a399038"' :
                                            'id="xs-components-links-module-HomeModule-b6259eb8d857dd387fce667c1a399038"' }>
                                            <li class="link">
                                                <a href="components/AssetMonitoringComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AssetMonitoringComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BenefitsOfIotComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BenefitsOfIotComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomerSatisfactionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomerSatisfactionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeviceManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeviceManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DpdhlAndIotComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DpdhlAndIotComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HowItWorksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HowItWorksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PredectiveMaintenanceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PredectiveMaintenanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SecurityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SecurityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmartEnergyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SmartEnergyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrackTraceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrackTraceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WhatIsIotComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WhatIsIotComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link">HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationRoutingModule.html" data-type="entity-link">NotificationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationsModule.html" data-type="entity-link">NotificationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotificationsModule-3d530610541d13ea0612920e6692a95e"' : 'data-target="#xs-components-links-module-NotificationsModule-3d530610541d13ea0612920e6692a95e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotificationsModule-3d530610541d13ea0612920e6692a95e"' :
                                            'id="xs-components-links-module-NotificationsModule-3d530610541d13ea0612920e6692a95e"' }>
                                            <li class="link">
                                                <a href="components/NotificationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-c1946533c553c2bb47d9be7cc9b3ba04"' : 'data-target="#xs-components-links-module-SharedModule-c1946533c553c2bb47d9be7cc9b3ba04"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-c1946533c553c2bb47d9be7cc9b3ba04"' :
                                            'id="xs-components-links-module-SharedModule-c1946533c553c2bb47d9be7cc9b3ba04"' }>
                                            <li class="link">
                                                <a href="components/AlertsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BreadcrumbComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatGridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatGridComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarLeftComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarLeftComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PopUpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-c1946533c553c2bb47d9be7cc9b3ba04"' : 'data-target="#xs-directives-links-module-SharedModule-c1946533c553c2bb47d9be7cc9b3ba04"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-c1946533c553c2bb47d9be7cc9b3ba04"' :
                                        'id="xs-directives-links-module-SharedModule-c1946533c553c2bb47d9be7cc9b3ba04"' }>
                                        <li class="link">
                                            <a href="directives/ClickOutsideDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClickOutsideDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UcRolesModule.html" data-type="entity-link">UcRolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UcRolesModule-a081e1fcbfec76c5a5e4095cc9fd90f2"' : 'data-target="#xs-components-links-module-UcRolesModule-a081e1fcbfec76c5a5e4095cc9fd90f2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UcRolesModule-a081e1fcbfec76c5a5e4095cc9fd90f2"' :
                                            'id="xs-components-links-module-UcRolesModule-a081e1fcbfec76c5a5e4095cc9fd90f2"' }>
                                            <li class="link">
                                                <a href="components/UcComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UcComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UcRolesRoutingModule.html" data-type="entity-link">UcRolesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-c41da08a8fae1632046e819853efb17a"' : 'data-target="#xs-components-links-module-UsersModule-c41da08a8fae1632046e819853efb17a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-c41da08a8fae1632046e819853efb17a"' :
                                            'id="xs-components-links-module-UsersModule-c41da08a8fae1632046e819853efb17a"' }>
                                            <li class="link">
                                                <a href="components/OnboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OnboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserOnboardingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserOnboardingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-c41da08a8fae1632046e819853efb17a"' : 'data-target="#xs-injectables-links-module-UsersModule-c41da08a8fae1632046e819853efb17a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c41da08a8fae1632046e819853efb17a"' :
                                        'id="xs-injectables-links-module-UsersModule-c41da08a8fae1632046e819853efb17a"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link">UsersRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AddComponent-1.html" data-type="entity-link">AddComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddComponent-2.html" data-type="entity-link">AddComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddComponent-3.html" data-type="entity-link">AddComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DetailsComponent-1.html" data-type="entity-link">DetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DetailsComponent-2.html" data-type="entity-link">DetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DetailsComponent-3.html" data-type="entity-link">DetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditComponent-1.html" data-type="entity-link">EditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditComponent-2.html" data-type="entity-link">EditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditComponent-3.html" data-type="entity-link">EditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListComponent-1.html" data-type="entity-link">ListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListComponent-2.html" data-type="entity-link">ListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListComponent-3.html" data-type="entity-link">ListComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppConstants.html" data-type="entity-link">AppConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApplicationConstants.html" data-type="entity-link">ApplicationConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssociationsConstants.html" data-type="entity-link">AssociationsConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/BusinessUnitConstants.html" data-type="entity-link">BusinessUnitConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardConstants.html" data-type="entity-link">DashboardConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeviceConstant.html" data-type="entity-link">DeviceConstant</a>
                            </li>
                            <li class="link">
                                <a href="classes/IDeviceForm.html" data-type="entity-link">IDeviceForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/IDeviceList.html" data-type="entity-link">IDeviceList</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserConstant.html" data-type="entity-link">UserConstant</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppInsightService.html" data-type="entity-link">AppInsightService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApplicationService.html" data-type="entity-link">ApplicationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssociationsService.html" data-type="entity-link">AssociationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BusinessUnitService.html" data-type="entity-link">BusinessUnitService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardService.html" data-type="entity-link">DashboardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeviceIdResolverService.html" data-type="entity-link">DeviceIdResolverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeviceResolverService.html" data-type="entity-link">DeviceResolverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeviceService.html" data-type="entity-link">DeviceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeService.html" data-type="entity-link">HomeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderService.html" data-type="entity-link">LoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedService.html" data-type="entity-link">SharedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/LoaderInterceptor.html" data-type="entity-link">LoaderInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ApplicationListIdResolverService.html" data-type="entity-link">ApplicationListIdResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/ApplicationListResolverService.html" data-type="entity-link">ApplicationListResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AssociationsResolverService.html" data-type="entity-link">AssociationsResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/BusinessUnitGroupsResolverService.html" data-type="entity-link">BusinessUnitGroupsResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/BusinessUnitIdResolverService.html" data-type="entity-link">BusinessUnitIdResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/BusinessUnitListResolverService.html" data-type="entity-link">BusinessUnitListResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/BusinessUnitResolverService.html" data-type="entity-link">BusinessUnitResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/BusinessUnitResolverService-1.html" data-type="entity-link">BusinessUnitResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/OnboardEditResolverService.html" data-type="entity-link">OnboardEditResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/ResourceGroupResolverService.html" data-type="entity-link">ResourceGroupResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserIdResolverService.html" data-type="entity-link">UserIdResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserResolverService.html" data-type="entity-link">UserResolverService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IApplicationForm.html" data-type="entity-link">IApplicationForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IApplicationList.html" data-type="entity-link">IApplicationList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBreadCrumb.html" data-type="entity-link">IBreadCrumb</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBusinessUnitForm.html" data-type="entity-link">IBusinessUnitForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBusinessUnitList.html" data-type="entity-link">IBusinessUnitList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGraph.html" data-type="entity-link">IGraph</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUsersList.html" data-type="entity-link">IUsersList</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});