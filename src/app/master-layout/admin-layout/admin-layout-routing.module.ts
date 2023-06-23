import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadChildren: () => import('../../views/admin/dashboard/dashboard.module').then(dashboard => dashboard.DashboardModule) },
  { path: 'customers', loadChildren: () => import('../../views/admin/customers/customers.module').then(cust => cust.CustomersModule) },
  { path: 'dealers', loadChildren: () => import('../../views/admin/dealer/dealer.module').then(dealer => dealer.DealerModule) },
  { path: 'sellers', loadChildren: () => import('../../views/admin/seller/seller.module').then(seller => seller.SellerModule) },
  { path: 'manufacturers', loadChildren: () => import('../../views/admin/manufacturers/manufacturers.module').then(manufacturers => manufacturers.ManufacturersModule) },
  { path: 'brands', loadChildren: () => import('../../views/admin/brands/brands.module').then(brand => brand.BrandsModule) },
  { path: 'sponsor', loadChildren: () => import('../../views/admin/sponsor/sponsor.module').then(sponsor => sponsor.SponsorModule) },
  { path: 'categories', loadChildren: () => import('../../views/admin/categories/categories.module').then(categories => categories.CategoriesModule) },
  { path: 'attributes', loadChildren: () => import('../../views/admin/attributes/attributes.module').then(attributes => attributes.AttributesModule) },
  { path: 'products', loadChildren: () => import('../../views/admin/products/products.module').then(product => product.ProductsModule) },
  { path: 'faq', loadChildren: () => import('../../views/admin/faq/faq.module').then(faq => faq.FaqModule) },
  { path: 'faq-group', loadChildren: () => import('../../views/admin/faq-group/faq-group.module').then(faq => faq.FAQGroupModule) },
  { path: 'policy', loadChildren: () => import('../../views/admin/policy/policy.module').then(policy => policy.PolicyModule) },
  { path: 'settings', loadChildren: () => import('../../views/admin/settings/settings.module').then(settings => settings.SettingsModule) },
  { path: 'orders', loadChildren: () => import('../../views/admin/orders/orders.module').then(order => order.OrdersModule) },
  { path: 'top-listing-subscriptions', loadChildren: () => import('../../views/admin/top-listing-subscription-payment-history/top-listing-subscription-payment-history.module').then(top => top.TopListingSubscriptionPaymentHistoryModule) },
  { path: 'dealer-subscriptions', loadChildren: () => import('../../views/admin/dealer-subscription-payment-history/dealer-subscription-payment-history.module').then(dealer => dealer.DealerSubscriptionPaymentHistoryModule)},
  { path: 'article-categories', loadChildren: () => import('../../views/admin/article-categories/article-categories.module').then(categories => categories.ArticleCategoriesModule) },
  { path: 'articles', loadChildren: () => import('../../views/admin/articles/article.module').then(article => article.ArticleModule) },
  { path: 'plans', loadChildren: () => import('../../views/admin/plans/plans.module').then(plans => plans.PlansModule) },
  { path: 'newsletter-templates' , loadChildren:()=> import('../../views/admin/newsletter-templates/newsletter-templates.module').then(templates=>templates.NewsletterTemplatesModule) },
  { path: 'newsletter-subscribers', loadChildren: () => import('../../views/admin/newsletter-subscribers/newsletter-subscribers.module').then(newsletter => newsletter.NewsletterSubscribersModule) },
  { path: 'reports', loadChildren: () => import('../../views/admin/reports/reports.module').then(reports => reports.ReportsModule) },
  { path: 'shipping_insurance',loadChildren:()=>import('../../views/admin/shipping_insurance/shipping_insurance.module').then(ins=>ins.ShippingInsuranceModule)},
  { path: 'shipping_pricing',loadChildren:()=>import('../../views/admin/shipping_pricing/shipping_pricing.module').then(sp=>sp.ShippingPricingModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
