Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'colors/index'
      post 'colors/create'
      get 'show/:id', to: 'colors#show'
      delete 'destroy/:id', to: 'colors#destroy'
    end
  end
  root 'home_page#index'

  get '/*path' => 'home_page#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
