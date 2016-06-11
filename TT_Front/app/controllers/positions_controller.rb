class PositionsController < ApplicationController
	require 'net/http'

	def index
		@positions = Position.All()
	end

	def new

	end

	def show

	end

	def update

	end

	def create
		Position.Post(params[:position])
	end

	def edit

	end

	def destroy
	end
end
