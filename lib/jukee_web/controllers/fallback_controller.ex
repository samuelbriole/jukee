defmodule JukeeWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use JukeeWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(JukeeWeb.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(JukeeWeb.ErrorView, :"404")
  end

  def call(conn, {:error, :wrong_credentials}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(JukeeWeb.SessionView, "wrong_credentials.json")
  end

  def call(conn, {:error, :no_session}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(JukeeWeb.SessionView, "no_session.json")
  end

  def call(conn, {:error, :invalid_issuer}) do
    conn
    |> put_status(:bad_request)
    |> render(JukeeWeb.SessionView, "invalid_issuer.json")
  end

  def call(conn, {:error, :already_taken_username}) do
    conn
    |> put_status(:bad_request)
    |> render(JukeeWeb.SessionView, "already_taken_username.json")
  end

  def call(conn, {:error, :already_taken_email}) do
    conn
    |> put_status(:bad_request)
    |> render(JukeeWeb.SessionView, "already_taken_email.json")
  end

  def call(conn, {:error, "Unknown resource type"}) do
    conn
    |> put_status(:unauthorized)
    |> render(JukeeWeb.SessionView, "wrong_token.json")
  end

  def call(conn, {:error, :user_not_found}) do
    conn
    |> put_status(:not_found)
    |> render(JukeeWeb.UserView, "404.json")
  end

  def call(conn, {:error, :forbidden}) do
    conn
    |> put_status(:forbidden)
    |> render(JukeeWeb.ErrorView, "permission_denied.json")
  end
end
