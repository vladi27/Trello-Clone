Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  resources :signup
  namespace :api, defaults: {format: :json} do
    patch '/update_pos/:id', to: "lists#update_pos"
    patch '/update_lists_pos/:id', to: "boards#update_lists_pos"
    patch '/update_recent_boards/:id', to: "users#update_recent_boards"

    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :boards
    resources :comments

    resources :lists, only: [:create, :edit, :destroy, :show, :update, :index]

    resources :cards, only: [:create, :edit, :destroy, :index, :show, :update]
    resources :invitations

    end
end
