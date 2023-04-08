class AuthenticationController < ApplicationController
    skip_before_action :authenticate_request
  
    # POST /auth/login
    def login
      @user = User.find_by_email(params[:email])
      if @user&.authenticate(params[:password])
        token = jwt_encode(user_id: @user.id)
        render json: { token: token }, status: :ok
      else
        render json: { error: 'unauthorized' }, status: :unauthorized
      end
    end
  
    # POST /auth/sso_login
    def sso_login
      sso_token = params[:sso_token]
      user_info = SSO.verify(sso_token)
  
      @user = User.find_by_email(user_info[:email])
      unless @user
        
        @user = User.create(email: user_info[:email], username: user_info[:username])
      end
  
      token = jwt_encode(user_id: @user.id)
      render json: { token: token }, status: :ok
    end
  end
