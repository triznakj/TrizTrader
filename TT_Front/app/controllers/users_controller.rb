class UsersController < ApplicationController
	require 'net/http'

	def index
		@users = User.All()

	end

	def new
	end

	def create
		#render plain: params[:user].inspect
		User.Post(params[:user])
	end
end
