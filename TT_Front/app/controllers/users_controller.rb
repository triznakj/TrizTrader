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

	def edit
		@user = User.find(params[:id])
	end

	def destroy
		User.delete(params[:id])
	end
end
